/* eslint-disable */
export const columnData = {
  statereport: ['First Name', 'Last Name', 'Email', 'Projects', 'Playlists', 'Activities'],
  statejobs: ['ID', 'Queue', 'Job', 'Error', 'Created / Failed', 'Action'],
  statelogs: ['Job', 'Status', 'Started', 'Detail', 'Duration', 'Error'],

  projectIndex: [
    // 'Image',
    'Name',
    'Created',
    // 'Description',
    'ID',
    'Author',
    'Library status',
    // 'Org ID',
    'Shared status',
    // 'Starter Project',
    // 'Status',
    'Updated',
    'Action',
  ],
  projectUser: ['Project Name', 'Created Date', 'Expired Date', 'Download'],
  projectUserSortCol: ['Created Date'],

  projectAll: ['Name', 'Created', 'Description', 'ID', 'Author', 'Library status', 'Library preferences', 'Sharing', 'Updated'],
  projectAllSortCol: ['Created'],

  ActivityTypes: ['Name', 'Order', 'Items'],
  ActivityTypesSortCol: ['Order'],

  ActivityItems: ['Name', 'Order', 'Meta'],
  ActivityItemsSortCol: ['Order'],

  userall: ['Date', 'First Name', 'Last Name', 'Email', 'Organization', 'Org Type', 'Role'],
  userallSortCol: ['First Name'],

  lmssettings: ['URL', 'Type', 'User', 'Email', 'Site Name', 'Description'],
  lmssettingsSortCol: ['Type'],

  organization: ['Name', 'Domain', 'Projects', 'Sub Org.', 'Users', 'Teams'],
  organizationSortCol: ['Name', 'Domain'],

  IntegrationBrightCove: ['Studio org ID', 'Account ID', 'BrightCove email ID ', 'Account name', 'Description', 'Key', 'Secret', 'CSS'],
  sortIntegrationBrightCove: ['Account name'],
  defaultsso: ['Site Name', 'URL', 'Type', 'Client Id', 'Description'],
  defaultssoSortCol: ['Site Name'],

  ltitool: ['Name', 'URL', 'Tool type', 'User', 'Description', 'Version'],
  ltitoolSortCol: ['Name'],

  subjects: ['Name', 'Order', ''],
  subjectsSortCol: ['Order'],

  educationLevel: ['Name', 'Order', ''],
  educationLevelSortCol: ['Order'],

  authorTags: ['Name', 'Order', ''],
  authorTagsSortCol: ['Order'],

  activityLayouts: ['Name', 'Order', 'Items'],
  activityLayoutsSortCol: ['Order'],

  teams: ['Name', 'Created', 'Description', 'Members', 'Projects', 'Updated'],
  teamsSortCol: ['Created'],

  indActivitiesCol: ['Name', 'Created', 'ID', 'Author', 'Library', 'Library preference', 'Sharing', 'Updated'],
  indActivitiesSortCol: ['Created'],

  indActivitiesExportCol: ['Name', 'Created', 'Expired date', 'Download'],
  indActivitiesExportSortCol: ['Created'],
};
