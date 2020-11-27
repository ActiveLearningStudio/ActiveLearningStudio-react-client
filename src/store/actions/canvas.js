import canvasService from 'services/canvas.service';
import {
  DO_SEARCH,
  BACK_TO_SEARCH,
} from '../actionTypes';

export const searchAction = (params) => async (dispatch) => {
  const results = await canvasService.search(params);
  dispatch({
    type: DO_SEARCH,
    results,
  });
};

export const backToSearchAction = () => async (dispatch) => {
  dispatch({
    type: BACK_TO_SEARCH,
  });
};
