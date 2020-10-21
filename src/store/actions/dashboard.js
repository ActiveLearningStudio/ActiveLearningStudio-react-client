import dashboardService from 'services/dashboard.service';
import {
    GET_USER_PROJECTS,
    GET_SHARED_USER_PROJECTS
} from '../actionTypes';

export const getUserProjectsAction = (shared) => async (dispatch) => {
  const projects = await dashboardService.getUserProjects();
  dispatch({
    type: shared ? GET_SHARED_USER_PROJECTS : GET_USER_PROJECTS,
    projects,
  });
};