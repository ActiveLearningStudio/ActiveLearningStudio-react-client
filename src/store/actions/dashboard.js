import dashboardService from 'services/dashboard.service';
import {
  GET_USER_PROJECTS,
  GET_SHARED_USER_PROJECTS,
  GET_USER_ACTIVITIES,
  GET_SHARED_USER_ACTIVITIES,
  GET_USER_PLAYLISTS,
} from '../actionTypes';

export const getUserProjectsAction = (shared, query) => async (dispatch) => {
  const projects = await dashboardService.getUserProjects();
  dispatch({
    type: shared ? GET_SHARED_USER_PROJECTS : GET_USER_PROJECTS,
    projects,
    query,
  });
};

// TODO: fix eslint issues
/* eslint-disable */
export const getUserActivitiesAction = (shared, query) => async (dispatch) => {
  const activities = [];
  const projects = await dashboardService.getUserProjects();

  for (const project of projects.projects) {
    const playlists = await dashboardService.getProject(project.id);
    for (const playlist of playlists.playlists) {
      for (const activity of playlist.activities) {
        if (shared && activity.shared == false) continue;

        if (query !== '' && activity.h5p_content.title.search(new RegExp(query, 'i')) === -1) continue;

        activities.push({
          ...activity,
          project_id: project.id,
        });
      }
    }
  }

  dispatch({
    type: shared ? GET_SHARED_USER_ACTIVITIES : GET_USER_ACTIVITIES,
    activities,
  });
};

export const getUserPlaylistsAction = (shared, query) => async (dispatch) => {
  const allPlaylists = [];
  const projects = await dashboardService.getUserProjects();

  for (const project of projects.projects) {
    const playlists = await dashboardService.getProject(project.id);

    for (const playlist of playlists.playlists) {
      if (query !== '' && playlist.title.search(new RegExp(query, 'i')) === -1) continue;

      allPlaylists.push(playlist);
    }
  }

  dispatch({
    type: GET_USER_PLAYLISTS,
    playlists: allPlaylists,
  });
};
