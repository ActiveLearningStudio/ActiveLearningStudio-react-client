import Swal from 'sweetalert2';

import searchService from 'services/search.service';
import { SEARCH_REDUX } from '../actionTypes';

export const searchRedux = (data, searchQuery, meta) => ({
  type: SEARCH_REDUX,
  data,
  searchQuery,
  meta,
});

export const simpleSearchAction = (searchQuery, from, size) => async (dispatch) => {
  const response = await searchService.searchResult(searchQuery, from, size);
  if (response.errors) {
    if (response.errors.query) {
      Swal.fire(response.errors.query[0]);
    }
  } else {
    dispatch(searchRedux(response.data, searchQuery, response.meta));
  }
};

export const cloneProject = (projectID) => {
  searchService.cloneProject(projectID);
};

export const clonePlaylist = (projectId, playlistId) => {
  searchService.clonePlaylist(projectId, playlistId);
};

export const cloneActivity = (playlistId, activityId) => {
  searchService.cloneActivity(playlistId, activityId);
};

// export const advancedSearches = (searchQuery) => {
//   return async (dispatch) => {
//     const response = axios
//       .get(
//         global.config.laravelAPIUrl +
//           `/search/advance?query=${searchQuery.phrase}&education_level_id=${
//             searchQuery.subject
//           }&userid=${searchQuery.grade}&negativeQuery=${
//             searchQuery.no_words
//           }&sort=${""}&from=${searchQuery.email}&size=${
//             searchQuery.standard
//           }`,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       )
//       .then((res) => {
//         dispatch(searchRedux(res.data));
//       });
//   };
// };
