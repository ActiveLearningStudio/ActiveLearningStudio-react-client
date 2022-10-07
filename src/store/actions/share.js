/* eslint-disable */
import Swal from 'sweetalert2';
import store from '../index';
import searchService from 'services/search.service';

// eslint-disable-next-line import/prefer-default-export
export const copyProject = async (projectId, courseId, token) => {
  Swal.fire({
    title: 'Publishing....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await searchService.googleClassShare(projectId, courseId, token, activeOrganization?.id);
  if (result.course) {
    Swal.fire({
      icon: 'success',
      title: 'Shared!',
      confirmButtonColor: '#5952c6',
      html: 'Your project has been shared to Google Classroom',
      // text: `Your playlist has been submitted to ${lmsUrl}`,
    });
  } else {
    Swal.fire({
      confirmButtonColor: '#5952c6',
      icon: 'error',
      text: 'Something went wrong, Kindly try again.',
    });
  }
};

export const publishPlaylist = async (projectId, courseId, topicId, playlistId, token) => {
  Swal.fire({
    title: 'Publishing....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await searchService.googleClassPublishPlaylist(projectId, courseId, topicId, playlistId, token, activeOrganization?.id);
  if (result.course) {
    Swal.fire({
      icon: 'success',
      title: 'Shared!',
      confirmButtonColor: '#5952c6',
      html: 'Your Playlist has been published to Google Classroom',
      // text: `Your playlist has been submitted to ${lmsUrl}`,
    });
  } else {
    Swal.fire({
      confirmButtonColor: '#5952c6',
      icon: 'error',
      text: 'Something went wrong, Kindly try again.',
    });
  }
};

export const publistActivity = async (projectId, courseId, topicId, playlistId, activityId, token) => {
  Swal.fire({
    title: 'Publishing....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await searchService.googleClassPublishActivity(projectId, courseId, topicId, playlistId, activityId, token, activeOrganization?.id);
  if (result.course) {
    Swal.fire({
      icon: 'success',
      title: 'Shared!',
      confirmButtonColor: '#5952c6',
      html: 'Your Activity has been published to Google Classroom',
      // text: `Your playlist has been submitted to ${lmsUrl}`,
    });
  } else {
    Swal.fire({
      confirmButtonColor: '#5952c6',
      icon: 'error',
      text: 'Something went wrong, Kindly try again.',
    });
  }
};

export const publishIdependentActivity = async (courseId, topicId, activityId, token) => {
  Swal.fire({
    title: 'Publishing....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await searchService.googleClassPublishIndependentActivity(courseId, topicId, activityId, token, activeOrganization?.id);
  if (result.course) {
    Swal.fire({
      icon: 'success',
      title: 'Shared!',
      confirmButtonColor: '#5952c6',
      html: 'Your Activity has been published to Google Classroom',
    });
  } else {
    Swal.fire({
      confirmButtonColor: '#5952c6',
      icon: 'error',
      text: 'Something went wrong, Kindly try again.',
    });
  }
};
