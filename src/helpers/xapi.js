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

export function extendStatement(statement, props) {
  const statementExtended = statement;
  const platform = H5PActvityPathMapToPlatform().find((el) => el[props.match.path]);
  if (platform !== undefined) {
    const platformName = platform[props.match.path];
    statementExtended.context.platform = platformName;
  }

  // TODO (1) - in new prevew we will not have 'parentPlaylist' in props so handle it accordingly. probably need to remove if statment
  if (props.parentPlaylist !== undefined) {
    // TODO (2) - need to set ativityPreviewUrl constant on new pattren of http://localhost:3000/activity/18041/submission/Cg4I4uew5KIEEL_tuLHoBQ
    // it hold the debate of getting submission id
    const ativityPreviewUrl = `${window.location.origin}/project/${props.parentPlaylist.project_id
    }/playlist/${props.parentPlaylist.id
    }/activity/${props.activityId}/preview`;
    const grouping = [{ objectType: 'Activity', id: ativityPreviewUrl }];
    statementExtended.context.contextActivities.grouping = grouping;
  }

  // TODO (3) - update prop "statementExtended.actor" according to requirment mentioned below. This is xAPI statement 'Agent' property enhancement
  // it holds the debate we have around getting gc-user-id
  /*
    {
      "objectType": "Agent",
      "account": {
        "homePage": "https://classroom.google.com"
        "name": "[gc-user-id]"
      }
    }
  */

  return statementExtended;
}
