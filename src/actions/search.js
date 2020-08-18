import axios from "axios";
import Swal from "sweetalert2";
const { token } = JSON.parse(localStorage.getItem("auth"));
const response = await axios.get(
  global.config.laravelAPIUrl + "/project?projectId=" + projectId,

  {
    headers: {
      Authorization: "Bearer " + token,
    },
  }
);
