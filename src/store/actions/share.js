/* eslint-disable */
import Swal from 'sweetalert2';
import store from '../index';
import searchService from 'services/search.service';
import { forEach } from 'lodash';

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
//publisher for canvas

export const publishToCanvas = async (courseId, settings, playlistName, playlistId, activityId) => {
  const { id, lms_url } = settings;
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
  const result = await searchService.canvasClassPublishActivity(courseId, id, playlistName, playlistId, activityId);
  if (result.Activity) {
    Swal.fire({
      icon: 'success',
      title: 'Published!',
      confirmButtonColor: '#5952c6',
      html: `Your Project has been published to <a target="_blank" href="${lms_url}">${lms_url}</a>`,
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

export const createAssignmentGroup = async (courseId, settings, playlistName, activityId) => {
  const { id } = settings;
  Swal.fire({
    title: 'Creating New Module....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  const res = await searchService.canvasCreateNewAssignmentGroup(courseId, id, playlistName);
  if (res.response_code === 200) {
    publishToCanvas(courseId, settings, res.data.name, res.data.id, activityId);
  }
};
export const createNewCoursetoCanvas = async (canvasProjectName, courseId, projectId, settings, playlistName, playlistId, activityId, projectPlaylistPublish) => {
  const { id, lms_name, lms_url } = settings;
  if (courseId && courseId !== 'Create a new Course') {
    Swal.fire({
      title: 'Publishing....',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    publishProjectPlaylistToCanvas(projectId, playlistId, settings, courseId, canvasProjectName);
  } else {
    Swal.fire({
      title: 'Creating New Course....',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    const res = await searchService.canvasCreateNewCourse(id, playlistName || canvasProjectName);

    if (res.response_code === 200) {
      if (!!projectPlaylistPublish) {
        publishProjectPlaylistToCanvas(projectId, playlistId, settings, res.data.id, canvasProjectName);
      } else {
        createAssignmentGroup(res.data.id, settings, res.data.name, activityId);
      }
    }
  }
};

//publis to t canvas
export const publishProjectPlaylistToCanvas = async (projectId, playlistId, settings, ccid, canvasProjectName) => {
  const { id, lms_url, lms_name } = settings;
  const globalStore = store.getState();
  const allplaylist = globalStore?.playlist.playlists;
  async function asyncFunc(ccid, creationtype) {
    for (let x = 0; x < allplaylist.length; x += 1) {
      const result = await searchService.publishPlaylisttoCanvas(projectId, allplaylist[x].id, lms_name, id, ccid, creationtype);
      if (x + 1 === allplaylist.length) {
        Swal.fire({
          icon: 'success',
          title: 'Published!',
          confirmButtonColor: '#5952c6',
          html: `Your Project has been published to <a target="_blank" href="${lms_url}">${lms_url}</a>`,
          // text: `Your playlist has been submitted to ${lmsUrl}`,
        });
      }
    }
  }
  if (allplaylist?.length > 0 && canvasProjectName) {
    Swal.fire({
      title: 'How you want to publish this playlist?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'As Module',
      denyButtonText: `As Assignment`,
    }).then(async (result) => {
      Swal.fire({
        title: 'Publishing....',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      if (result.isConfirmed) {
        asyncFunc(ccid, 'modules');
      } else if (result.isDenied) {
        asyncFunc(ccid, 'assignments');
      }
    });
  } else {
    Swal.fire({
      title: 'How you want to publish this playlist?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'As Module',
      denyButtonText: `As Assignment`,
    }).then(async (result) => {
      Swal.fire({
        title: 'Publishing....',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      if (result.isConfirmed) {
        const result = await searchService.publishPlaylisttoCanvas(projectId, playlistId, lms_name, id, ccid, 'modules');
        Swal.fire({
          icon: 'success',
          title: 'Published!',
          confirmButtonColor: '#5952c6',
          html: `Your Project has been published to <a target="_blank" href="${lms_url}">${lms_url}</a>`,
          // text: `Your playlist has been submitted to ${lmsUrl}`,
        });
      } else if (result.isDenied) {
        const result = await searchService.publishPlaylisttoCanvas(projectId, playlistId, lms_name, id, ccid, 'assignments');
        Swal.fire({
          icon: 'success',
          title: 'Published!',
          confirmButtonColor: '#5952c6',
          html: `Your Project has been published to <a target="_blank" href="${lms_url}">${lms_url}</a>`,
          // text: `Your playlist has been submitted to ${lmsUrl}`,
        });
      }
    });
  }

  // const response = await projectService.fetchLmsDetails(lms, projectId, settingId);
  // if (response.project) {
  //   const globalStoreClone = store.getState();
  //   dispatch(setLmsCourse(response.project, globalStoreClone));

  //   Swal.fire({
  //     title: `This Playlist will be added to ${lms}. If the Playlist does not exist, it will be created. `,
  //     text: 'Would you like to proceed?',
  //     showCancelButton: true,
  //     confirmButtonColor: '#5952c6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Continue',
  //   }).then(async (result) => {
  //     if (result.value) {
  //       Swal.fire({
  //         icon: loaderImg,
  //         title: 'Publishing....',
  //         showCancelButton: false,
  //         showConfirmButton: false,
  //         allowOutsideClick: false,
  //       });

  //       const globalStore = store.getState();
  //       const playlistCounter = !!globalStore.project.lmsCourse && globalStore.project.lmsCourse.playlistsCopyCounter ? globalStore.project.lmsCourse.playlistsCopyCounter : [];

  //       let counterId = 0;
  //       playlistCounter.forEach((p) => {
  //         if (playlistId === p.playlist_id) {
  //           counterId = p.counter;
  //         }
  //       });

  //       await projectService.lmsPublish(lms, projectId, settingId, counterId, playlistId);

  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Published!',
  //         confirmButtonColor: '#5952c6',
  //         html: `Your Project has been published to <a target="_blank" href="${lmsUrl}">${lmsUrl}</a>`,
  //         // text: `Your playlist has been submitted to ${lmsUrl}`,
  //       });
  //     }
  //   });
  // }
};
