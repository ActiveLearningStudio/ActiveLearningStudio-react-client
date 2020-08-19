import axios from "axios";
import Swal from "sweetalert2";

import { SEARCHREDUX } from "../constants/actionTypes";
const { token } = JSON.parse(localStorage.getItem("auth"));
export const simpleSearchfunction = (searchquerry) => {
  return async (dispatch) => {
    const response = axios
      .get(
        global.config.laravelAPIUrl + "/search/advance?query=" + searchquerry,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        dispatch(searchredux(res.data, searchquerry));
      });
  };
};

export const advancedSearches = (searchquerry) => {
  console.log(searchquerry);
  return async (dispatch) => {
    const response = axios
      .get(
        global.config.laravelAPIUrl +
          `/search/advance?query=${searchquerry.phrase}&educationlevelid=${
            searchquerry.subject
          }&userid=${searchquerry.grade}&negativeQuery=${
            searchquerry.no_words
          }&sort=${""}&from=${searchquerry.email}&size=${
            searchquerry.standard
          }`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        dispatch(searchredux(res.data));
      });
  };
};

export const searchredux = (result, searchquerry) => {
  return {
    type: SEARCHREDUX,
    result,
    searchquerry,
  };
};
