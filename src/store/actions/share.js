import Swal from 'sweetalert2';

import searchService from 'services/search.service';

// eslint-disable-next-line import/prefer-default-export
export const copyProject = async (projectId, courseId, token) => {
  Swal.fire({
    title: 'Publishing....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  const result = await searchService.googleClassShare(projectId, courseId, token);
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
