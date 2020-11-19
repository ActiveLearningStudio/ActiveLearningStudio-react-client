import canvasService from 'services/canvas.service';
import {
    DO_SEARCH
} from '../actionTypes';

export const searchAction = (params) => async (dispatch) => {
    const results = await canvasService.search(params);
    dispatch({
        type: DO_SEARCH,
        results,
    });
};