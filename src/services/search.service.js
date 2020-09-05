import config from 'config';
import Swal from 'sweetalert2';
import httpService from './http.service';

const { apiVersion } = config;

const searchResult = (searchquerry, from, size) => httpService
  .get(`https://refactored.curriki.org/api/api/v1/search/advanced?from=${from}&size=${size}&query=${searchquerry}`)
  // .get(`/${apiVersion}/search/advanced?from=${from}&size=${size}&query=${searchquerry}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const cloneProject = (projectId) => httpService
  .post(`/${apiVersion}/projects/${projectId}/clone`)
  .then(({ data }) => data)
  .catch((err) => Swal.fire(err.response.data.errors[0]));

const clonePlaylist = (projectId, playlistId) => httpService
  .post(`/${apiVersion}/projects/${projectId}/playlists/${playlistId}/clone`)
  .then(({ data }) => data)
  .catch((err) => Swal.fire(err.response.data.errors[0]));

const cloneActivity = (playlistId, ActivityId) => httpService
  .post(`/${apiVersion}/playlists/${playlistId}/activities/${ActivityId}/clone`)
  .then(({ data }) => data)
  .catch((err) => Swal.fire(err.response.data.errors[0]));

export default {
  searchResult,
  cloneProject,
  clonePlaylist,
  cloneActivity,
};

// const searchResult = {
//   'activities': 4,

//   "playlists": 1,
//   "total": 5,
//   "data": [
//       {
//           "id": 88,
//           "thumb_url": "",
//           "title": "Text Structure Lesson 2 Description",
//           "description": "Learning Objective: The student will define and describe the main characteristics of the text structure description.",
//           "model": "Project",
//           "user": {
//               "id": 9,
//               "first_name": "Gina",
//               "last_name": "Henderson",
//               "name": "ginahenderson",
//               "email": "ginamhenderson6@gmail.com",
//               "organization_name": "Contracting",
//               "job_title": "Independent Contractor",
//               "address": "3 Prout Place  Unit B Palm Coast, FL 32164",
//               "phone_number": "3862648808",
//               "hubspot": false,
//               "subscribed": true,
//               "created_at": "2020-08-27T12:28:20.000000Z",
//               "updated_at": "2020-08-27T13:00:22.000000Z"
//           }
//       },
//       {
//           "id": 457,
//           "thumb_url": "/storage/uploads/3zjZuLoQrRk0MZ5wP7UPyOut5zUybf3tW3a4Q2M1.png",
//           "title": "Text Structure Lesson 2 Problem and Solution",
//           "description": "Learning Objective\nThe learner will define and describe the main characteristics of the text structure problem and solution.",
//           "model": "Project",
//           "user": null
//       },
//       {
//           "id": 456,
//           "thumb_url": "/storage/uploads/PBFJXxOzF06ux2kH6OFiBAFCmevQk7fwQ4nsZIic.jpeg",
//           "title": "Text Structure Lesson 2 Compare & Contrast",
//           "description": "Learning Objective\nThe learner will define and describe the main characteristics of the text structure compare and contrast.",
//           "model": "Project",
//           "user": null
//       },
//       {
//           "id": 455,
//           "thumb_url": "/storage/uploads/qrVoIiyDWtShEUMJDRs3HEn0Q7F6EkdvLaufqHBZ.jpeg",
//           "title": "Text Structure Lesson 2 Cause & Effect",
//           "description": "Learning Objective\nThe learner will define and describe the main characteristics of the text structure cause and effect.",
//           "model": "Activity",
//           "user": null
//       },
//       {
//           "id": 454,
//           "thumb_url": "/storage/uploads/kRZF7VGpbpiSd2W9UlPqKGxbpjrdSXC2YfVt9LrJ.jpeg",
//           "title": "Text Structure Lesson 2 Sequence",
//           "description": "Learning Objective\nThe learner will define and describe the main characteristics of the text structure sequence.",
//           "model": "Project",
//           "user": null
//       },
//       {
//           "id": 453,
//           "thumb_url": "/storage/uploads_tmp/ZAVcKrJiVzpy7zDsMRFe4drMurrwNFY7YCIMRErA.png",
//           "title": "Text Structure Lesson 2 Description",
//           "description": "Learning Objective: The student will define and describe the main characteristics of the text structure description.",
//           "model": "Project",
//           "user": null
//       },
//       {
//           "id": 452,
//           "thumb_url": "/storage/uploads_tmp/Uxh3rMNoe9CKXW2SAc9yOHxSXk8EmwFjxdPQ9llm.jpeg",
//           "title": "Text Structure Lesson 1",
//           "description": "Today's Learning Objective: I understand that writing is a form of communication that is communicated using different ways (text structures).",
//           "model": "Project",
//           "user": null
//       },
//       {
//           "id": 1105,
//           "title": "Text Structure Lesson 2 Problem/Solution",
//           "model": "Playlist",
//           "user": null
//       },
//       {
//           "id": 1104,
//           "title": "Text Structure Lesson 2 Compare/Contrast",
//           "model": "Playlist",
//           "user": null
//       },
//       {
//           "id": 1102,
//           "title": "All About That Text",
//           "model": "Playlist",
//           "user": null
//       }
//   ],
//   "meta": {
//       "projects": 7,
//       "playlists": 3,
//       "total": 10
//   }
// }
