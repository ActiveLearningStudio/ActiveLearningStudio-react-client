// import Swal from "sweetalert2";
import { SEARCH_REDUX } from 'store/actionTypes';
import searchService from 'services/search.service';

export const searchredux = (result, searchquerry) => ({
  type: SEARCH_REDUX,
  result,
  searchquerry,
});

export const simpleSearchfunction = (searchquerry, from, size) => async (dispatch) => {
  const response = await searchService.searchResult(searchquerry, from, size);
  dispatch(searchredux(response.data));
};

// export const advancedSearches = (searchquerry) => {
//   console.log(searchquerry);
//   return async (dispatch) => {
//     const response = axios
//       .get(
//         global.config.laravelAPIUrl +
//           `/search/advance?query=${searchquerry.phrase}&educationlevelid=${
//             searchquerry.subject
//           }&userid=${searchquerry.grade}&negativeQuery=${
//             searchquerry.no_words
//           }&sort=${""}&from=${searchquerry.email}&size=${
//             searchquerry.standard
//           }`,

//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       )
//       .then((res) => {
//         dispatch(searchredux(res.data));
//       });
//   };
// };
