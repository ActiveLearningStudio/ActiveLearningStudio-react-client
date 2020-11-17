// list of H5P activities links (react routes) where xAPI dispatch need to initialized
export function allowedH5PActvityPaths() {
  return [
    // '/project/:projectId/playlist/:playlistId/activity/:activityId/preview',
    // '/activity/:activityId/shared',
    '/gclass/launch/:userId/:courseId/:activityId/:classworkId',
  ];
}

// map H5P activities links (react routes) to supported Platforms
export function H5PActvityPathMapToPlatform() {
  return [
    { '/project/:projectId/playlist/:playlistId/activity/:activityId/preview': 'CurrikiStudio' },
    { '/activity/:activityId/shared': 'CurrikiStudio' },
    { '/gclass/launch/:userId/:courseId/:activityId/:classworkId': 'Google Classroom' },
  ];
}

// check if xAPI need to initialized for H5P Activity link (react route)
export function isxAPINeeded(currentRoute) {
  return allowedH5PActvityPaths().includes(currentRoute);
}

export function extendStatement(statement, params, skipped = false) {
  const {
    path,
    activityId,
    submissionId,
    attemptId,
    studentId,
  } = params;
  const platform = H5PActvityPathMapToPlatform().find((el) => el[path]);
  if (platform === undefined) return;

  const statementExtended = { ...statement };
  const grouping = [
    {
      objectType: 'Activity',
      id: `${window.location.origin}/activity/${activityId}/submission/${submissionId}`,
    },
  ];
  const other = [
    {
      objectType: 'Activity',
      id: `${window.location.origin}/activity/${activityId}/submission/${submissionId}/${attemptId}`,
    },
  ];
  const actor = {
    objectType: 'Agent',
    account: {
      homePage: 'https://classroom.google.com',
      name: studentId,
    },
  };
  statementExtended.context.platform = platform[path];
  statementExtended.context.contextActivities.grouping = grouping;
  statementExtended.context.contextActivities.other = other;
  statementExtended.actor = actor;
  if (skipped) {
    statementExtended.verb = {
      id: 'http://id.tincanapi.com/verb/skipped',
      display: {
        'en-US': 'skipped',
      },
    };
  }
  return statementExtended;
}
