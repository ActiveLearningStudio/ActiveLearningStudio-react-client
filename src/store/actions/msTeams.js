import msTeamsService from 'services/msTeams.service';
import {
  MT_CODE,
  MT_ASSIGNMENT_ID,
  MT_CLASS_ID,
  MT_VIEW,
  MT_USER_ROLE,
  MT_TOKEN,
  MT_REFRESH_TOKEN,
  MT_SUBMISSION,
  MT_TURNED_IN_ACTIVITY,
} from '../actionTypes';

export const mtCode = (value) => ({
  type: MT_CODE,
  payload: value,
});
export const mtAssignmentId = (value) => ({
  type: MT_ASSIGNMENT_ID,
  payload: value,
});
export const mtClassId = (value) => ({
  type: MT_CLASS_ID,
  payload: value,
});
export const mtView = (value) => ({
  type: MT_VIEW,
  payload: value,
});
export const mtUserRole = (value) => ({
  type: MT_USER_ROLE,
  payload: value,
});
export const mtToken = (value) => ({
  type: MT_TOKEN,
  payload: value,
});
export const mtRefreshToken = (value) => ({
  type: MT_REFRESH_TOKEN,
  payload: value,
});
export const mtSubmissionId = (value) => ({
  type: MT_SUBMISSION,
  payload: value,
});

export const turnInAction = (classworkId, submissionId, courseId) => async (dispatch) => {
  const turnedIn = await msTeamsService.turnIn(classworkId, submissionId, courseId);
  dispatch({
    type: MT_TURNED_IN_ACTIVITY,
    payload: turnedIn,
  });
};
