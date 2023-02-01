/* eslint-disable */
export const SHOW_CREATE_PLAYLIST_MODAL =
  "SHOW_CREATE_PLAYLIST_MODAL";
export const HIDE_CREATE_PLAYLIST_MODAL =
  "HIDE_CREATE_PLAYLIST_MODAL";

export const REORDER_PLAYLIST = "REORDER_PLAYLIST";

export const SHOW_CREATE_RESOURCE_MODAL =
  "SHOW_CREATE_RESOURCE_MODAL";
export const HIDE_CREATE_RESOURCE_MODAL =
  "HIDE_CREATE_RESOURCE_MODAL";

export const SHOW_RESOURCE_SELECT_ACTIVITY =
  "SHOW_RESOURCE_SELECT_ACTIVITY";
export const SHOW_RESOURCE_ACTIVITY_TYPE =
  "SHOW_RESOURCE_ACTIVITY_TYPE";

export const SHOW_RESOURCE_ACTIVITY_BUILD =
  "SHOW_RESOURCE_ACTIVITY_BUILD";
export const HIDE_RESOURCE_ACTIVITY_BUILD =
  "HIDE_RESOURCE_ACTIVITY_BUILD";

export const PREVIEW_RESOURCE = "PREVIEW_RESOURCE";

export const HIDE_PREVIEW_PLAYLIST_MODAL =
  "HIDE_PREVIEW_PLAYLIST_MODAL";

export const SHOW_CREATE_PROJECT_MODAL = "SHOW_CREATE_PROJECT_MODAL";
export const HIDE_CREATE_PROJECT_MODAL = "HIDE_CREATE_PROJECT_MODAL";

export const LOAD_PLAYLIST = "LOAD_PLAYLIST";
export const SET_ORG_LTI_SETTINGS = "SET_ORG_LTI_SETTINGS";
export const SHOW_DELETE_POPUP = "SHOW_DELETE_POPUP";
export const HIDE_DELETE_POPUP = "HIDE_DELETE_POPUP";

export const SHOW_DELETE_PROJECT_MODAL = "SHOW_DELETE_PROJECT_MODAL";

export const PAGE_LOADING = "PAGE_LOADING";
export const PAGE_LOADING_COMPLETE = "PAGE_LOADING_COMPLETE";

export const PROJECT_THUMBNAIL_PROGRESS =
  "PROJECT_THUMBNAIL_PROGRESS";
export const UPLOAD_PROJECT_THUMBNAIL = "UPLOAD_PROJECT_THUMBNAIL";

export const RESOURCE_THUMBNAIL_PROGRESS =
  "RESOURCE_THUMBNAIL_PROGRESS";
export const UPLOAD_RESOURCE_THUMBNAIL = "UPLOAD_RESOURCE_THUMBNAIL";
export const UPLOAD_ACTIVITY_TYPE_THUMBNAIL =
  "UPLOAD_ACTIVITY_TYPE_THUMBNAIL";
export const UPLOAD_ACTIVITY_ITEM_THUMBNAIL =
  "UPLOAD_ACTIVITY_ITEM_THUMBNAIL";
export const UPLOAD_ACTIVITY_LAYOUT_THUMBNAIL =
  "UPLOAD_ACTIVITY_LAYOUT_THUMBNAIL";
export const SHOW_RESOURCE_DESCRIBE_ACTIVITY =
  "SHOW_RESOURCE_DESCRIBE_ACTIVITY";
export const UPLOAD_ACTIVITY_TYPE_FILE = "UPLOAD_ACTIVITY_TYPE_FILE";

export const SELECT_ACTIVITY = "SELECT_ACTIVITY";
export const SELECT_ACTIVITY_TYPE = "SELECT_ACTIVITY_TYPE";
export const DESCRIBE_ACTIVITY = "DESCRIBE_ACTIVITY";

export const RESOURCE_VALIDATION_ERRORS =
  "RESOURCE_VALIDATION_ERRORS";

export const LOAD_H5P = "LOAD_H5P";
export const SHOW_LMS = "SHOW_LMS";
export const CHANGE_LOADING = "CHANGE_LOADING";

export const GOOGLE_CLASSROOM_LOGIN = "GOOGLE_CLASSROOM_LOGIN";
export const SAVE_GENERIC_RESOURCE = "SAVE_GENERIC_RESOURCE";
export const GOOGLE_SHARE = "GOOGLE_SHARE";
export const SHARE_CANAVS = "SHARE_CANAVS";
export const SHARE_MS_TEAM = "SHARE_MS_TEAM";
export const GOOGLE_CLASSROOM_LOGIN_FAILURE =
  "GOOGLE_CLASSROOM_LOGIN_FAILURE";
export const PUBLISH_LMS_SETTINGS = "PUBLISH_LMS_SETTINGS";

/* New Action Types */

/* Auth & User */
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

export const CONFIRM_EMAIL_REQUEST = "CONFIRM_EMAIL_REQUEST";
export const CONFIRM_EMAIL_SUCCESS = "CONFIRM_EMAIL_SUCCESS";
export const CONFIRM_EMAIL_FAIL = "CONFIRM_EMAIL_FAIL";

export const ACCEPT_TERMS_REQUEST = "ACCEPT_TERMS_REQUEST";
export const ACCEPT_TERMS_SUCCESS = "ACCEPT_TERMS_SUCCESS";
export const ACCEPT_TERMS_FAIL = "ACCEPT_TERMS_FAIL";

export const LOG_OUT = "LOG_OUT";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";

export const SEARCH_USERS_REQUEST = "SEARCH_USERS_REQUEST";
export const SEARCH_USERS_SUCCESS = "SEARCH_USERS_SUCCESS";
export const SEARCH_USERS_FAIL = "SEARCH_USERS_FAIL";
export const CLEAR_SEARCH = "CLEAR_SEARCH";

export const LOAD_ORGANIZATION_TYPES = "LOAD_ORGANIZATION_TYPES";
/* Auth & User */

/* Project */
export const CREATE_PROJECT_REQUEST = "CREATE_PROJECT_REQUEST";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAIL = "CREATE_PROJECT_FAIL";

export const LOAD_PROJECT_REQUEST = "LOAD_PROJECT_REQUEST";
export const LOAD_PROJECT_SUCCESS = "LOAD_PROJECT_SUCCESS";
export const SET_SELECTED_PROJECT = "SET_SELECTED_PROJECT";
export const CLEAR_SELECTED_PROJECT = "CLEAR_SELECTED_PROJECT";
export const CLEAR_PROJECT_SELECT = "CLEAR_PROJECT_SELECT";
export const LOAD_PROJECT_FAIL = "LOAD_PROJECT_FAIL";
export const LOAD_MY_CLONE_PROJECTS = "LOAD_MY_CLONE_PROJECTS";
export const ADD_MY_CLONE_PROJECTS = "ADD_MY_CLONE_PROJECTS";

export const UPDATE_PROJECT_REQUEST = "UPDATE_PROJECT_REQUEST";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_FAIL = "UPDATE_PROJECT_FAIL";

export const DELETE_PROJECT_REQUEST = "DELETE_PROJECT_REQUEST";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAIL = "DELETE_PROJECT_FAIL";

export const LOAD_MY_PROJECTS = "LOAD_MY_PROJECTS";
export const LOAD_MY_PROJECTS_SELECTED = "LOAD_MY_PROJECTS_SELECTED";
export const LOAD_MY_PROJECTS_FAILED = "LOAD_MY_PROJECTS_FAILED";
export const SHARE_PROJECT = "SHARE_PROJECT";
export const ADD_MY_PROJECTS = "ADD_MY_PROJECTS";

export const SIDEBAR_ALL_PROJECT = "SIDEBAR_ALL_PROJECT";
export const SIDEBAR_SAMPLE_PROJECT = "SIDEBAR_SAMPLE_PROJECT";
export const SIDEBAR_UPDATE_PROJECT = "SIDEBAR_UPDATE_PROJECT";
export const PROJECT_VISIBILITY_TYPES = "PROJECT_VISIBILITY_TYPES";
export const CURRENT_VISIBILITY_TYPE = "CURRENT_VISIBILITY_TYPE";
export const SEARCH_PREVIEW_PROJECT = "SEARCH_PREVIEW_PROJECT";
/* Project */

/* Playlist */
export const CREATE_PLAYLIST_REQUEST = "CREATE_PLAYLIST_REQUEST";
export const CREATE_PLAYLIST_SUCCESS = "CREATE_PLAYLIST_SUCCESS";
export const CREATE_PLAYLIST_FAIL = "CREATE_PLAYLIST_FAIL";

export const LOAD_PLAYLIST_REQUEST = "LOAD_PLAYLIST_REQUEST";
export const LOAD_PLAYLIST_SUCCESS = "LOAD_PLAYLIST_SUCCESS";
export const LOAD_PLAYLIST_FAIL = "LOAD_PLAYLIST_FAIL";

export const UPDATE_PLAYLIST_REQUEST = "UPDATE_PLAYLIST_REQUEST";
export const UPDATE_PLAYLIST_SUCCESS = "UPDATE_PLAYLIST_SUCCESS";
export const UPDATE_PLAYLIST_FAIL = "UPDATE_PLAYLIST_FAIL";

export const DELETE_PLAYLIST_REQUEST = "DELETE_PLAYLIST_REQUEST";
export const DELETE_PLAYLIST_SUCCESS = "DELETE_PLAYLIST_SUCCESS";
export const DELETE_PLAYLIST_FAIL = "DELETE_PLAYLIST_FAIL";

export const LOAD_PROJECT_PLAYLISTS = "LOAD_PROJECT_PLAYLISTS";

export const REORDER_PLAYLISTS_REQUEST = "REORDER_PLAYLISTS_REQUEST";
export const REORDER_PLAYLISTS_SUCCESS = "REORDER_PLAYLISTS_SUCCESS";
export const REORDER_PLAYLISTS_FAIL = "REORDER_PLAYLISTS_FAIL";
export const ENABLE_PLAYLIST_SHARE = "ENABLE_PLAYLIST_SHARE";
export const DISABLE_PLAYLIST_SHARE = "DISABLE_PLAYLIST_SHARE";
export const LOAD_SINGLE_SHARED_PLAYLIST =
  "LOAD_SINGLE_SHARED_PLAYLIST";
export const LOAD_ALL_SHARED_PLAYLIST = "LOAD_ALL_SHARED_PLAYLIST";
export const SEARCH_PREVIEW_PLAYLIST = "SEARCH_PREVIEW_PLAYLIST";

/* Playlist */

/* Activity */
export const LOAD_RESOURCE_REQUEST = "LOAD_RESOURCE_REQUEST";
export const LOAD_RESOURCE_SUCCESS = "LOAD_RESOURCE_SUCCESS";
export const LOAD_RESOURCE_FAIL = "LOAD_RESOURCE_FAIL";

export const CREATE_RESOURCE = "CREATE_RESOURCE";
export const EDIT_RESOURCE = "EDIT_RESOURCE";
export const EDIT_ACTIVITY_TYPE = "EDIT_ACTIVITY_TYPE";
export const ADD_ACTIVITY_TYPE = "ADD_ACTIVITY_TYPE";
export const DELETE_ACTIVITY_TYPE = "DELETE_ACTIVITY_TYPE";
export const GET_ACTIVITY_ITEMS_ADMIN = "GET_ACTIVITY_ITEMS_ADMIN";
export const EDIT_ACTIVITY_ITEM = "EDIT_ACTIVITY_ITEM";
export const ADD_ACTIVITY_ITEM = "ADD_ACTIVITY_ITEM";
export const DELETE_ACTIVITY_ITEM = "DELETE_ACTIVITY_ITEM";
export const RESOURCE_SAVED = "RESOURCE_SAVED";
export const DELETE_RESOURCE_REQUEST = "DELETE_RESOURCE_REQUEST";
export const DELETE_RESOURCE_SUCCESS = "DELETE_RESOURCE_SUCCESS";
export const DELETE_RESOURCE_FAIL = "DELETE_RESOURCE_FAIL";
export const SELECTED_ACTIVITY_TYPE = "SELECTED_ACTIVITY_TYPE";
export const SELECTED_ACTIVITY_ITEM = "SELECTED_ACTIVITY_ITEM";
export const LOAD_RESOURCE_TYPES_REQUEST =
  "LOAD_RESOURCE_TYPES_REQUEST";
export const LOAD_RESOURCE_TYPES_SUCCESS =
  "LOAD_RESOURCE_TYPES_SUCCESS";
export const LOAD_RESOURCE_TYPES_FAIL = "LOAD_RESOURCE_TYPES_FAIL";

export const LOAD_RESOURCE_ITEMS_REQUEST =
  "LOAD_RESOURCE_ITEMS_REQUEST";
export const LOAD_RESOURCE_ITEMS_SUCCESS =
  "LOAD_RESOURCE_ITEMS_SUCCESS";
export const LOAD_RESOURCE_ITEMS_FAIL = "LOAD_RESOURCE_ITEMS_FAIL";
export const LOAD_RESOURCE_TYPE_REQUEST =
  "LOAD_RESOURCE_TYPE_REQUEST";

export const SAVE_SEARCH_KEY_IN_CREATION =
  "SAVE_SEARCH_KEY_IN_CREATION";
export const SAVE_FORM_DATA_IN_CREATION =
  "SAVE_FORM_DATA_IN_CREATION";
export const CLEAR_FORM_DATA_IN_CREATION =
  "CLEAR_FORM_DATA_IN_CREATION";

export const SEARCH_PREVIEW_ACTIVITY = "SEARCH_PREVIEW_ACTIVITY";

/* Activity */

export const SET_LMS_COURSE = "SET_LMS_COURSE";

export const SEARCH_REDUX = "SEARCH_REDUX";
export const SET_SEARCH_TYPE = "SET_SEARCH_TYPE";
/* Metrics */
export const GET_USER_METRICS = "GET_USER_METRICS";
export const GET_USER_MEMBERSHIP = "GET_USER_MEMBERSHIP";
export const ACTIVITY_VIEWED = "ACTIVITY_VIEWED";
export const PLAYLIST_VIEWED = "PLAYLIST_VIEWED";
export const PROJECT_VIEWED = "PROJECT_VIEWED";
/* Metrics */

/* Google Share */
export const LOAD_GOOGLE_CLASSROOM_COURSES =
  "LOAD_GOOGLE_CLASSROOM_COURSES";
export const ALL_COURSES = "ALL_COURSES";
export const GET_COURSE_TOPICS = "GET_COURSE_TOPICS";
export const GET_STUDENT_COURSES = "GET_STUDENT_COURSES";
export const SET_STUDENT_AUTH = "SET_STUDENT_AUTH";
export const SET_STUDENT_AUTH_TOKEN = "SET_STUDENT_AUTH_TOKEN";
export const GET_H5P_SETTINGS = "GET_H5P_SETTINGS";
export const GET_SUBMISSION = "GET_SUBMISSION";
export const TURNED_IN_ACTIVITY = "TURNED_IN_ACTIVITY";
export const GET_SUMMARY_AUTH = "GET_SUMMARY_AUTH";
export const GET_OUTCOME_SUMMARY = "GET_OUTCOME_SUMMARY";

/* Team */
export const CREATE_TEAM_REQUEST = "CREATE_TEAM_REQUEST";
export const CREATE_TEAM_SUCCESS = "CREATE_TEAM_SUCCESS";
export const CREATE_TEAM_FAIL = "CREATE_TEAM_FAIL";

export const LOAD_TEAM_REQUEST = "LOAD_TEAM_REQUEST";
export const LOAD_TEAM_SUCCESS = "LOAD_TEAM_SUCCESS";
export const LOAD_TEAM_FAIL = "LOAD_TEAM_FAIL";

export const UPDATE_TEAM_REQUEST = "UPDATE_TEAM_REQUEST";
export const UPDATE_TEAM_SUCCESS = "UPDATE_TEAM_SUCCESS";
export const UPDATE_TEAM_FAIL = "UPDATE_TEAM_FAIL";

export const DELETE_TEAM_REQUEST = "DELETE_TEAM_REQUEST";
export const DELETE_TEAM_SUCCESS = "DELETE_TEAM_SUCCESS";
export const DELETE_TEAM_FAIL = "DELETE_TEAM_FAIL";

export const LOAD_TEAMS = "LOAD_TEAMS";
export const LOAD_TEAM_PROJECTS = "LOAD_TEAM_PROJECTS";

export const RESET_SELECTED_TEAM = "RESET_SELECTED_TEAM";
export const UPDATE_SELECTED_TEAM = "UPDATE_SELECTED_TEAM";
export const SHOW_CREATE_TEAM = "SHOW_CREATE_TEAM";
export const SHOW_INVITE_MEMBER = "SHOW_INVITE_MEMBER";
export const SHOW_ASSIGN_TEAM = "SHOW_ASSIGN_TEAM";

export const INVITE_MEMBER_CONFIRM_REQUEST =
  "INVITE_MEMBER_CONFIRM_REQUEST";
export const INVITE_MEMBER_CONFIRM_SUCCESS =
  "INVITE_MEMBER_CONFIRM_SUCCESS";
export const INVITE_MEMBER_CONFIRM_FAIL =
  "INVITE_MEMBER_CONFIRM_FAIL";

export const INVITE_MEMBERS_REQUEST = "INVITE_MEMBERS_REQUEST";
export const INVITE_MEMBERS_SUCCESS = "INVITE_MEMBERS_SUCCESS";
export const INVITE_MEMBERS_FAIL = "INVITE_MEMBERS_FAIL";

export const REMOVE_MEMBER_REQUEST = "REMOVE_MEMBER_REQUEST";
export const REMOVE_MEMBER_SUCCESS = "REMOVE_MEMBER_SUCCESS";
export const REMOVE_MEMBER_FAIL = "REMOVE_MEMBER_FAIL";

export const ADD_TEAM_PROJECTS_REQUEST = "ADD_TEAM_PROJECTS_REQUEST";
export const ADD_TEAM_PROJECTS_SUCCESS = "ADD_TEAM_PROJECTS_SUCCESS";
export const ADD_TEAM_PROJECTS_FAIL = "ADD_TEAM_PROJECTS_FAIL";

export const REMOVE_PROJECT_REQUEST = "REMOVE_PROJECT_REQUEST";
export const REMOVE_PROJECT_SUCCESS = "REMOVE_PROJECT_SUCCESS";
export const REMOVE_PROJECT_FAIL = "REMOVE_PROJECT_FAIL";

export const ADD_MEMBERS_TO_PROJECT_REQUEST =
  "ADD_MEMBERS_TO_PROJECT_REQUEST";
export const ADD_MEMBERS_TO_PROJECT_SUCCESS =
  "ADD_MEMBERS_TO_PROJECT_SUCCESS";
export const ADD_MEMBERS_TO_PROJECT_FAIL =
  "ADD_MEMBERS_TO_PROJECT_FAIL";

export const REMOVE_MEMBER_FROM_PROJECT_REQUEST =
  "REMOVE_MEMBER_FROM_PROJECT_REQUEST";
export const REMOVE_MEMBER_FROM_PROJECT_SUCCESS =
  "REMOVE_MEMBER_FROM_PROJECT_SUCCESS";
export const REMOVE_MEMBER_FROM_PROJECT_FAIL =
  "REMOVE_MEMBER_FROM_PROJECT_FAIL";
export const ADD_TEAM_ROLES = "ADD_TEAM_ROLES";
export const ADD_TEAM_PERMISSION = "ADD_TEAM_PERMISSION";
export const GET_TEAM_PROJECTS = "GET_TEAM_PROJECTS";
export const CHANGE_USER_ROLE = "CHANGE_USER_ROLE";
export const PROJECT_SELECTED_FOR_CLONE =
  "PROJECT_SELECTED_FOR_CLONE";
export const CLEAR_TEAM_PERMISSIONS = "CLEAR_TEAM_PERMISSIONS";
export const NEW_TEAM = "NEW_TEAM";
export const WHITE_BOARD_URL = "WHITE_BOARD_URL";
/* Team */

/* Group */
export const CREATE_GROUP_REQUEST = "CREATE_GROUP_REQUEST";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";
export const CREATE_GROUP_FAIL = "CREATE_GROUP_FAIL";

export const LOAD_GROUP_REQUEST = "LOAD_GROUP_REQUEST";
export const LOAD_GROUP_SUCCESS = "LOAD_GROUP_SUCCESS";
export const LOAD_GROUP_FAIL = "LOAD_GROUP_FAIL";

export const UPDATE_GROUP_REQUEST = "UPDATE_GROUP_REQUEST";
export const UPDATE_GROUP_SUCCESS = "UPDATE_GROUP_SUCCESS";
export const UPDATE_GROUP_FAIL = "UPDATE_GROUP_FAIL";

export const DELETE_GROUP_REQUEST = "DELETE_GROUP_REQUEST";
export const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS";
export const DELETE_GROUP_FAIL = "DELETE_GROUP_FAIL";

export const LOAD_GROUPS = "LOAD_GROUPS";

export const RESET_SELECTED_GROUP = "RESET_SELECTED_GROUP";
export const UPDATE_SELECTED_GROUP = "UPDATE_SELECTED_GROUP";
export const SHOW_CREATE_GROUP = "SHOW_CREATE_GROUP";
// export const SHOW_INVITE_MEMBER = 'SHOW_INVITE_MEMBER';
export const SHOW_ASSIGN_GROUP = "SHOW_ASSIGN_GROUP";

// export const INVITE_MEMBER_CONFIRM_REQUEST = 'INVITE_MEMBER_CONFIRM_REQUEST';
// export const INVITE_MEMBER_CONFIRM_SUCCESS = 'INVITE_MEMBER_CONFIRM_SUCCESS';
// export const INVITE_MEMBER_CONFIRM_FAIL = 'INVITE_MEMBER_CONFIRM_FAIL';

// export const INVITE_MEMBERS_REQUEST = 'INVITE_MEMBERS_REQUEST';
// export const INVITE_MEMBERS_SUCCESS = 'INVITE_MEMBERS_SUCCESS';
// export const INVITE_MEMBERS_FAIL = 'INVITE_MEMBERS_FAIL';

// export const REMOVE_MEMBER_REQUEST = 'REMOVE_MEMBER_REQUEST';
// export const REMOVE_MEMBER_SUCCESS = 'REMOVE_MEMBER_SUCCESS';
// export const REMOVE_MEMBER_FAIL = 'REMOVE_MEMBER_FAIL';

export const ADD_GROUP_PROJECTS_REQUEST =
  "ADD_GROUP_PROJECTS_REQUEST";
export const ADD_GROUP_PROJECTS_SUCCESS =
  "ADD_GROUP_PROJECTS_SUCCESS";
export const ADD_GROUP_PROJECTS_FAIL = "ADD_GROUP_PROJECTS_FAIL";

// export const REMOVE_PROJECT_REQUEST = 'REMOVE_PROJECT_REQUEST';
// export const REMOVE_PROJECT_SUCCESS = 'REMOVE_PROJECT_SUCCESS';
// export const REMOVE_PROJECT_FAIL = 'REMOVE_PROJECT_FAIL';

// export const ADD_MEMBERS_TO_PROJECT_REQUEST = 'ADD_MEMBERS_TO_PROJECT_REQUEST';
// export const ADD_MEMBERS_TO_PROJECT_SUCCESS = 'ADD_MEMBERS_TO_PROJECT_SUCCESS';
// export const ADD_MEMBERS_TO_PROJECT_FAIL = 'ADD_MEMBERS_TO_PROJECT_FAIL';

// export const REMOVE_MEMBER_FROM_PROJECT_REQUEST = 'REMOVE_MEMBER_FROM_PROJECT_REQUEST';
// export const REMOVE_MEMBER_FROM_PROJECT_SUCCESS = 'REMOVE_MEMBER_FROM_PROJECT_SUCCESS';
/* Group */

/* Account */
export const GET_USER_LMS_SETTINGS = "GET_USER_LMS_SETTINGS";
export const USER_LMS_SETTINGS_LOADING = "USER_LMS_SETTINGS_LOADING";
/* Account */

/* Dashboard */
export const GET_USER_PROJECTS = "GET_USER_PROJECTS";
export const GET_SHARED_USER_PROJECTS = "GET_SHARED_USER_PROJECTS";
export const GET_USER_ACTIVITIES = "GET_USER_ACTIVITIES";
export const GET_SHARED_USER_ACTIVITIES =
  "GET_SHARED_USER_ACTIVITIES";
export const GET_USER_PLAYLISTS = "GET_USER_PLAYLISTS";
/* Dashboard */

/* NOTIFICATIONS */
export const ADD_ALL_NOTIFICATIONS = "ADD_ALL_NOTIFICATIONS";
export const ADD_SINGLE_NOTIFICATION = "ADD_SINGLE_NOTIFICATION";
export const CLEAR_ALL_NOTIFICATION = "CLEAR_ALL_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
/* NOTIFICATIONS */

export const SIDE_BAR_COLLAPSE_TOGGLE = "SIDE_BAR_COLLAPSE_TOGGLE";

/* CANVAS LMS INTEGRATION */
export const DO_SEARCH = "DO_SEARCH";
export const SHOW_RESULTS = "SHOW_RESULTS";
export const BACK_TO_SEARCH = "BACK_TO_SEARCH";
export const UPDATE_PARAMS = "UPDATE_PARAMS";
export const SET_SEARCH_PREVIEW_ACTIVITY =
  "SET_SEARCH_PREVIEW_ACTIVITY";
export const CLOSE_SEARCH_PREVIEW_ACTIVITY =
  "CLOSE_SEARCH_PREVIEW_ACTIVITY";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const GRADE_PASS_BACK = "GRADE_PASS_BACK";
export const LTI_ACTIVITY_INIT = "LTI_ACTIVITY_INIT";
export const DO_BROWSE = "DO_BROWSE";
export const GET_LTI_SUMMARY = "GET_LTI_SUMMARY";
export const GET_LTI_SUMMARY_ACTIVITY_INFO =
  "GET_LTI_SUMMARY_ACTIVITY_INFO";
export const SHOW_SEARCH_PROJECT = "SHOW_SEARCH_PROJECT";
export const SHOW_SEARCH_PLAYLIST = "SHOW_SEARCH_PLAYLIST";
export const GET_TEAMS = "GET_TEAMS";
export const GET_ACTIVITIES = "GET_ACTIVITIES";

/* Organization */
export const CHANGE_ACTIVE_SCREEN = "CHANGE_ACTIVE_SCREEN";
export const GET_PREVIOUS_SCREEN = "GET_PREVIOUS_SCREEN";
export const ADD_CURRENT_ORG = "ADD_CURRENT_ORG";
export const ADD_ALL_ORG = "ADD_ALL_ORG";
export const UPDATE_ALL_ORG = "UPDATE_ALL_ORG";
export const ADD_ACTIVE_ORG = "ADD_ACTIVE_ORG";
export const UPDATE_CUURENT_ORG = "UPDATE_CUURENT_ORG";
export const ADD_SUBORG_LIST = "ADD_SUBORG_LIST";
export const NEW_SUBORG_ADD = "NEW_SUBORG_ADD";
export const REMOVE_SUBORG_ADD = "REMOVE_SUBORG_ADD";
export const CLEAR_SUBORG_LIST = "CLEAR_SUBORG_LIST";
export const EDIT_ORGANIZATION = "EDIT_ORGANIZATION";
export const REMOVE_EDIT_ORGANIZATION = "REMOVE_EDIT_ORGANIZATION";
export const UPDATE_FEEDBACK = "UPDATE_FEEDBACK";
export const ALL_ROLES = "ALL_ROLES";
export const SAVE_HISTORY = "SAVE_HISTORY";
export const CLEAR_HISTORY = "CLEAR_HISTORY";
export const GET_ORGANIZATION_USERS = "GET_ORGANIZATION_USERS";
export const SEARCH_ORG = "SEARCH_ORG";
export const DELETE_USER_FROM_ORGANIZATION =
  "DELETE_USER_FROM_ORGANIZATION";
export const REMOVE_USER_FROM_ORGANIZATION =
  "REMOVE_USER_FROM_ORGANIZATION";
export const SEARCH_USER_IN_ORGANIZATION =
  "SEARCH_USER_IN_ORGANIZATION";
export const SET_ALL_PERSMISSION = "SET_ALL_PERSMISSION";
export const ADD_ROLES = "ADD_ROLES";
export const SET_ACTIVE_PERMISSION = "SET_ACTIVE_PERMISSION";
export const SET_ALL_PERSMISSION_ID = "SET_ALL_PERSMISSION_ID";
export const CLEAR_STATES_IN_ORGANIZATION =
  "CLEAR_STATES_IN_ORGANIZATION";
export const CLEAR_USERS_STATE = "CLEAR_USERS_STATE";
export const ORG_UPDATE_LIBRARY_PREFERENCE =
  "ORG_UPDATE_LIBRARY_PREFERENCE";
export const ORG_UPDATE_TOOLS_TIPS = "ORG_UPDATE_TOOLS_TIPS";

/* Admin */
export const SET_ACTIVE_FORM = "SET_ACTIVE_FORM";
export const CLEAR_ACTIVE_FORM = "CLEAR_ACTIVE_FORM";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const CURRENT_USER = "CURRENT_USER";
export const SHOW_HELP = "SHOW_HELP";
export const HIDE_HELP = "HIDE_HELP";
export const ADD_NEW_USER = "ADD_NEW_USER";
export const EDIT_NEW_USER = "EDIT_NEW_USER";
export const SET_ACTIVE_EDIT = "SET_ACTIVE_EDIT";
export const REMOVE_SUBORG_DEL = "REMOVE_SUBORG_DEL";
export const ADD_SUBORG_EDIT = "ADD_SUBORG_EDIT";
export const GET_ACTIVITY_TYPES = "GET_ACTIVITY_TYPES";
export const GET_ACTIVITY_ITEMS = "GET_ACTIVITY_ITEMS";
export const GET_USERS_REPORT = "GET_USERS_REPORT";
export const GET_JOBS_LISTING = "GET_JOBS_LISTING";
export const RETRY_ALL_FAILED_JOBS = "RETRY_ALL_FAILED_JOBS";
export const RETRY_FAILED_JOB = "RETRY_FAILED_JOB";
export const FORGET_ALL_FAILED_JOBS = "FORGET_ALL_FAILED_JOBS";
export const FORGET_FAILED_JOB = "FORGET_FAILED_JOB";
export const GET_LOGS_LISTING = "GET_LOGS_LISTING";
export const NEWLY_CREATED_RESOURCE = "NEWLY_CREATED_RESOURCE";
export const NEWLY_EDIT_RESOURCE = "NEWLY_EDIT_RESOURCE";
export const UPDATE_PAGE_NUMBER = "UPDATE_PAGE_NUMBER";
export const RESET_PAGE_NUMBER = "RESET_PAGE_NUMBER";
export const UPDATE_PAGINATION = "UPDATE_PAGINATION";
export const SET_ALL_PERMISSION = "SET_ALL_PERMISSION";
export const GET_LTI_TOOLS = "GET_LTI_TOOLS";
export const GET_DEFAULT_SSO = "GET_DEFAULT_SSO";
export const GET_LMS_INTEGRATION = "GET_LMS_INTEGRATION";
export const SHOW_REMOVE_USER = "SHOW_REMOVE_USER";
export const CANCEL_REMOVE_USER = "CANCEL_REMOVE_USER";
export const GET_SUBECTS = "GET_SUBECTS";
export const GET_EDUCATION_LEVEL = "GET_EDUCATION_LEVEL";
export const GET_AUTHOR_TAGS = "GET_AUTHOR_TAGS";
export const GET_ACTIVITY_LAYOUTS = "GET_ACTIVITY_LAYOUTS";
export const GET_MEDIA_SOURCES = "GET_MEDIA_SOURCES";
export const SET_ALL_DEFAULT_PERMISSION =
  "SET_ALL_DEFAULT_PERMISSION";
export const GET_LTI_TOOLS_TYPES_REQUEST =
  "GET_LTI_TOOLS_TYPES_REQUEST";
export const GET_LTI_TOOLS_TYPES_SUCCESS =
  "GET_LTI_TOOLS_TYPES_SUCCESS";
export const UPDATE_PAGINATION_COUNT = "UPDATE_PAGINATION_COUNT";
export const CLONE_LTI_TOOLS_TYPES_SUCCESS =
  "CLONE_LTI_TOOLS_TYPES_SUCCESS";
export const ORG_UPDATE_GCR_SETTINGS = "ORG_UPDATE_GCR_SETTINGS";
export const GET_TEAMS_ADMIN = "GET_TEAMS_ADMIN";
export const GET_ALL_MEDIA_SOURCE = "GET_ALL_MEDIA_SOURCE";
export const GET_ORG_MEDIA_SOURCE = "GET_ORG_MEDIA_SOURCE";
export const UPDATE_ORG_MEDIA_SOURCE = "UPDATE_ORG_MEDIA_SOURCE";

export const LTI_TOOLS_PAGINATION_UPDATE =
  "LTI_TOOLS_PAGINATION_UPDATE";
export const LTI_TOOLS_ADD_NEW = "LTI_TOOLS_ADD_NEW";
export const LTI_TOOLS_ADD_EDIT = "LTI_TOOLS_ADD_EDIT";
export const LTI_TOOLS_RELOAD_STATUS = "LTI_TOOLS_RELOAD_STATUS";

// ADD SUBJECT STATUS:
export const REF_TABLE_SUBJECT_ADD_NEW_SET =
  "REF_TABLE_SUBJECT_ADD_NEW_SET";
export const REF_TABLE_SUBJECT_ADD_NEW_CLEAR =
  "REF_TABLE_SUBJECT_ADD_NEW_CLEAR";

// MY ACTIVTY
export const SET_ACTIVE_ACTIVITY_SCREEN =
  "SET_ACTIVE_ACTIVITY_SCREEN";
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
export const CHANGE_ORIENTATION = "CHANGE_ORIENTATION";
export const SET_LAYOUT_ACTIVITY = "SET_LAYOUT_ACTIVITY";
export const SET_SELECTED_ACTIVITY = "SET_SELECTED_ACTIVITY";
export const SET_SINGLE_ACTIVITY = "SET_SINGLE_ACTIVITY";
export const CLEAR_STATE = "CLEAR_STATE";
export const ALL_IND_REQUEST_COMPLETE = "ALL_IND_REQUEST_COMPLETE";

// MY VIDEOS
export const ALL_VIDEOS = "ALL_VIDEOS";
export const ADD_VIDEO_URL = "ADD_VIDEO_URL";
export const ADD_VIDEO_FILE = "ADD_VIDEO_FILE";
export const SET_ACTIVE_VIDEO_SCREEN = "SET_ACTIVE_VIDEO_SCREEN";
export const REMOVE_VIDEOS = "REMOVE_VIDEOS";
export const ADD_NEW_VIDEO = "ADD_NEW_VIDEO";
export const EDIT_VIDEO_ACTIVITY = "EDIT_VIDEO_ACTIVITY";
export const EDIT_CMS_SCREEN = "EDIT_CMS_SCREEN";
export const UP_ALL_BRIGHTCOVE = "UP_ALL_BRIGHTCOVE";
export const NEW_BRIGHTCOVE = "NEW_BRIGHTCOVE";
export const DEL_BRIGHTCOVE = "DEL_BRIGHTCOVE";
export const EDIT_BRIGHTCOVE = "EDIT_BRIGHTCOVE";

// Existing activity insert into h5p
export const SELECT_EXISTING_ACTIVITY = "SELECT_EXISTING_ACTIVITY";
export const RESET_EXISTING_ACTIVITY = "RESET_EXISTING_ACTIVITY";

// IND activities
export const ALL_IND_ACTIVITIES = "ALL_IND_ACTIVITIES";
export const ADD_IND_ACTIVITIES = "ADD_IND_ACTIVITIES";
export const DEL_IND_ACTIVITIES = "DEL_IND_ACTIVITIES";
export const EDIT_IND_ACTIVITIES = "EDIT_IND_ACTIVITIES";
export const EDIT_IND_ACTIVITIES_INDEX = "EDIT_IND_ACTIVITIES_INDEX";
export const ALL_IND_ACTIVITIES_REQUEST =
  "ALL_IND_ACTIVITIES_REQUEST";
export const LOAD_MORE_IND_ACTIVITIES = "LOAD_MORE_IND_ACTIVITIES";

//IND ACTIVITIES ADMIN
export const ALL_ADMIN_IND_ACTIVITIES = "ALL_ADMIN_IND_ACTIVITIES";
export const EDIT_ADMIN_IND_ACTIVITIES = "EDIT_ADMIN_IND_ACTIVITIES";
export const DEL_ADMIN_IND_ACTIVITIES = "DEL_ADMIN_IND_ACTIVITIES";
export const EDIT_INDEX_ADMIN_IND_ACTIVITIES =
  "EDIT_INDEX_ADMIN_IND_ACTIVITIES";
export const CLEAR_IND_ACTIVITIES = "CLEAR_IND_ACTIVITIES";
export const ALL_ADMIN_EXPORTED_ACTIVITIES =
  "ALL_ADMIN_EXPORTED_ACTIVITIES";
export const CLEAR_ADMIN_EXPORTED_ACTIVITIES =
  "CLEAR_ADMIN_EXPORTED_ACTIVITIES";

export const SHOW_SKELETON = "SHOW_SKELETON";

// WORDPRESS SSO
export const WP_SSO_LOGIN_FAIL = "WP_SSO_LOGIN_FAIL";
export const WP_SSO_LOGIN_SUCCESS = "WP_SSO_LOGIN_SUCCESS";
export const WP_SSO_GET_SETTINGS = "WP_SSO_GET_SETTINGS";
export const SET_ALL_IV = "SET_ALL_IV";

/**
 * Komodo
 */

export const KOMODO_VIDEO_GET_SUCCESS = 'KOMODO_VIDEO_GET_SUCCESS';
export const KOMODO_VIDEO_LOAD = 'KOMODO_VIDEO_LOAD';
export const ADD_MORE_KOMODO_VIDEO = 'ADD_MORE_KOMODO_VIDEO';

/**
 * MS Teams
 */

 export const MT_CODE = 'MT_CODE';
 export const MT_ASSIGNMENT_ID = 'MT_ASSIGNMENT_ID';
 export const MT_CLASS_ID = 'MT_CLASS_ID';
 export const MT_VIEW = 'MT_VIEW';
 export const MT_USER_ROLE = 'MT_USER_ROLE';
 export const MT_TOKEN = 'MT_TOKEN';
 export const MT_REFRESH_TOKEN = 'MT_REFRESH_TOKEN';
 export const MT_SUBMISSION = 'MT_SUBMISSION';
 export const MT_TURNED_IN_ACTIVITY = 'MT_TURNED_IN_ACTIVITY';
