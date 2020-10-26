// list of H5P activities links (react routes) where xAPI dispatch need to initialized
export function allowedH5PActvityPaths() {
  return [
    // '/project/:projectId/playlist/:playlistId/activity/:activityId/preview',
    // '/activity/:activityId/shared',
  ];
}

// map H5P activities links (react routes) to supported Platforms
export function H5PActvityPathMapToPlatform() {
  return [
    { '/project/:projectId/playlist/:playlistId/activity/:activityId/preview': 'CurrikiStudio' },
    { '/activity/:activityId/shared': 'CurrikiStudio' },
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

  if (props.parentPlaylist !== undefined) {
    const ativityPreviewUrl = `${window.location.origin}/project/${props.parentPlaylist.project_id
    }/playlist/${props.parentPlaylist.id
    }/activity/${props.activityId}/preview`;
    const grouping = [{ objectType: 'Activity', id: ativityPreviewUrl }];
    statementExtended.context.contextActivities.grouping = grouping;
  }

  return statementExtended;
}
