import axios from "axios";
export const copyProject = (projectId) => {
  const { token } = JSON.parse(localStorage.getItem("auth"));
  axios
    .post(
      "/api/gapi/copy-project",
      { projectId },
      { headers: { Authorization: "Bearer " + token } }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const tokensave = (access_token) => {
  const { token } = JSON.parse(localStorage.getItem("auth"));
  axios
    .post(
      "/api/gapi/save-access-token",
      { access_token },
      { headers: { Authorization: "Bearer " + token } }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
