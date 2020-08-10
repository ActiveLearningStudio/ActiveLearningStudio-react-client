import axios from 'axios';
import Swal from 'sweetalert2';

export const copyProject = (projectId) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));
  Swal.fire({
    title: 'Publishing....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  axios
    .post(
      '/api/gapi/copy-project',
      { projectId },
      { headers: { Authorization: `Bearer ${token}` } },
    )
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
  const { token } = JSON.parse(localStorage.getItem('auth'));
  axios
    .post(
      '/api/gapi/save-access-token',
      { access_token: accessToken },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
