// list of H5P activities links (react routes) where xAPI dispatch need to initialized
export function allowedH5PActvityPaths() {
  return [
    '/gclass/launch/:userId/:courseId/:activityId/:classworkId',
    '/lti-tools/activity/:activityId',
    '/activity/:activityId/shared',
    '/genericlms/:lmsName/lmsurl/:lmsUrl/client/:lmsClientId/lmscourse/:lmsCourseId/lmsunit/:lmsUnitId/activity/:activityId',
  ];
}

// map H5P activities links (react routes) to supported Platforms
export function H5PActvityPathMapToPlatform() {
  return [
    { '/project/:projectId/playlist/:playlistId/activity/:activityId/preview': 'CurrikiStudio' },
    { '/activity/:activityId/shared': 'CurrikiStudio' },
    { '/gclass/launch/:userId/:courseId/:activityId/:classworkId': 'Google Classroom' },
    { '/lti-tools/activity/:activityId': 'LTI client' },
    { '/genericlms/:lmsName/lmsurl/:lmsUrl/client/:lmsClientId/lmscourse/:lmsCourseId/lmsunit/:lmsUnitId/activity/:activityId': 'GenericLMS' },
  ];
}

// check if xAPI need to initialized for H5P Activity link (react route)
export function isxAPINeeded(currentRoute) {
  return allowedH5PActvityPaths().includes(currentRoute);
}

export function extendStatement(h5pObj, statement, params, skipped = false) {
  const {
    path,
    activityId,
    submissionId,
    attemptId,
    studentId,
    courseId, // LMS course id
    homepage,
    toolPlatform,
    activeCourse,
    customCourseName,
    customApiDomainUrl,
    customCourseCode,
  } = params;

  const platform = H5PActvityPathMapToPlatform().find((el) => el[path]);
  if (platform === undefined) return;

  const statementExtended = { ...statement };
  const other = [
    {
      objectType: 'Activity',
      id: `${window.location.origin}/activity/${activityId}/submission/${submissionId}/${attemptId}`,
    },
    {
      objectType: 'Activity',
      id: `${window.location.origin}/activity/${activityId}/submission/${submissionId}`,
    },
  ];

  if (platform[path] === 'Google Classroom') {
    other.push({
      objectType: 'Activity',
      id: `${window.location.origin}/gclass/${courseId}`,
    });

    if (statementExtended.object && statementExtended.object.definition && statementExtended.object.definition.extensions) {
      statementExtended.object.definition.extensions['http://currikistudio.org/x-api/gclass-alternate-course-id'] = activeCourse.alternateLink;
      statementExtended.object.definition.extensions['http://currikistudio.org/x-api/course-name'] = activeCourse.name;
    }
  }

  if (platform[path] === 'LTI client' || 'GenericLMS') {
    other.push({
      objectType: 'Activity',
      id: `${window.location.origin}/lti/${courseId}`,
    });

    if (statementExtended?.object?.definition?.extensions) {
      statementExtended.object.definition.extensions['http://currikistudio.org/x-api/lms-course-name'] = customCourseName;
      statementExtended.object.definition.extensions['http://currikistudio.org/x-api/lms-domain-url'] = customApiDomainUrl;
      statementExtended.object.definition.extensions['http://currikistudio.org/x-api/lms-course-code'] = customCourseCode;
    }
  }

  const actor = {
    objectType: 'Agent',
    account: {
      homePage: homepage || 'https://classroom.google.com',
      name: studentId,
    },
  };

  if (statementExtended.context) {
    if (platform[path] === 'LTI client') {
      statementExtended.context.platform = toolPlatform;
    } else {
      statementExtended.context.platform = platform[path];
    }

    statementExtended.context.contextActivities.other = other;
  }

  statementExtended.actor = actor;

  // If the statement is marked as skipped, we supply the proper verb
  if (skipped) {
    statementExtended.verb = {
      id: 'http://adlnet.gov/expapi/verbs/skipped',
      display: {
        'en-US': 'skipped',
      },
    };

    // Some skipped statements come with score.min = 0 and score.max = 0
    // This causes an error in the backend
    if (
      statementExtended.result
      && statementExtended.result.score
      && statementExtended.result.score.min === statementExtended.result.score.max
    ) {
      statementExtended.result.score.max += 1;
    }
  }

  // Some H5Ps provide incompatible interaction types. Mapping those to valid ones here
  if (statementExtended.object && statementExtended.object.definition.interactionType === 'compound') {
    statementExtended.object.definition.interactionType = 'choice';
  }

  // We need page information for InteractiveBook statements but the children objects are agnostic to where
  // they're being used.
  // Here we crawl up through their heritage to see if they belong to an InteractiveBook, if they do, we
  // add the page info to the statement.
  let interactiveBookObject = h5pObj;

  while (interactiveBookObject && interactiveBookObject?.libraryInfo?.machineName !== 'H5P.InteractiveBook') {
    interactiveBookObject = interactiveBookObject.parent;
  }

  if (interactiveBookObject?.libraryInfo?.machineName === 'H5P.InteractiveBook') {
    const chapterIndex = interactiveBookObject.getActiveChapter();
    statementExtended.object.definition.extensions['http://currikistudio.org/x-api/h5p-chapter-name'] = interactiveBookObject.chapters[chapterIndex].title;
  }

  return statementExtended;
}

// Extends the xAPI statements for activities being directly shared through studio
// instead of published to an LMS
export function extendSharedActivityStatement(h5pObj, statement, params) {
  const {
    path,
    activityId,
  } = params;
  const statementExtended = { ...statement };

  // We fake these values for reporting features on anonymous routes
  const fakeSubId = Math.floor(Math.random() * 100000).toString();
  const fakeAttemptId = Math.floor(Math.random() * 100000).toString();
  const fakeCourseId = Math.floor(Math.random() * 100000).toString();

  const other = [
    {
      objectType: 'Activity',
      id: `${window.location.origin}/activity/${activityId}/submission/${fakeSubId}/${fakeAttemptId}`,
    },
    {
      objectType: 'Activity',
      id: `${window.location.origin}/activity/${activityId}/submission/${fakeSubId}`,
    },
    {
      objectType: 'Activity',
      id: `${window.location.origin}/gclass/${fakeCourseId}`,
    },
  ];

  const platform = H5PActvityPathMapToPlatform().find((el) => el[path]);
  if (platform === undefined) return;

  if (statementExtended?.context?.contextActivities) {
    statementExtended.context.platform = platform[path];
    statementExtended.context.contextActivities.other = other;
  }

  statementExtended.object.definition.extensions['http://id.tincanapi.com/extension/referrer'] = document.referrer ? document.referrer : window.location.origin;

  return statementExtended;
}
