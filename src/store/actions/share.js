import Swal from 'sweetalert2';
import axios from 'axios';

import searchService from 'services/search.service';

export const copyProject = (projectId) => {
  Swal.fire({
    title: 'Publishing....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  return searchService.googleClassShare(projectId)

    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Shared!',
        confirmButtonColor: '#5952c6',
        html: 'Your project has been shared to Google Classroom</a>',
        // text: `Yo'ur playlist has been submitted to ${lmsUrl}`,
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        confirmButtonColor: '#5952c6',
        icon: 'error',
        text: 'Something went wrong, Kindly try again',
      });
    });
};

export const tokenSave = (accessToken) => {
  searchService.googleShareToken(accessToken);
};
