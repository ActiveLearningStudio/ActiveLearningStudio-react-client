export const prepareLmsCourse = (action, state) => {
  const lms_course = { ...action.lmsCourse };
  console.log(lms_course);
  const playlists_copy_counter = [];
  const project = { ...state }.projects.find((p) => p.name === lms_course.course);
  if (project !== undefined) {
    for (let index = 0; index < project.playlists.length; index++) {
      const playlist = project.playlists[index];
      const playlist_found = lms_course.playlists.find((lp) => lp == playlist.title) !== undefined
        ? playlist.title
        : null;
      const playlist_copy_counters = lms_course.playlists
        .map((lp) => {
          const playlist_name_orig = playlist.title;
          const playlist_name = lp;
          const space = '\\s';
          const bracket_open = '\\(';
          const bracket_close = '\\)';
          const num = '\\d+';
          const regex = `${playlist_name_orig
            + space
            + bracket_open
          }(${
            num
          })${
            bracket_close}`;
          const re = new RegExp(regex, 'g');
          const res = playlist_name.match(re);
          // return res == null ? false : res[0];
          return res == null ? false : parseInt(res[0].match(/\d+(?!.*\d)/g));
        })
        .filter((n) => typeof n === 'number')
        .sort((a, b) => b - a);
      let playlist_counter = 0;
      if (playlist_found != null && playlist_copy_counters.length == 0) {
        playlist_counter = 1;
      } else if (playlist_copy_counters.length > 0) {
        playlist_counter = playlist_copy_counters[0] + 1;
      }
      playlists_copy_counter.push({
        playlist_id: playlist._id,
        counter: playlist_counter,
      });
    }
  } else if (action.allstate) {
    const { playlists } = { ...action.allstate }.playlist;

    for (let index = 0; index < playlists.length; index++) {
      const playlist = playlists[index];
      const playlist_found = lms_course.playlists.find((lp) => lp == playlist.title) !== undefined
        ? playlist.title
        : null;
      const playlist_copy_counters = lms_course.playlists
        .map((lp) => {
          const playlist_name_orig = playlist.title;
          const playlist_name = lp;
          const space = '\\s';
          const bracket_open = '\\(';
          const bracket_close = '\\)';
          const num = '\\d+';
          const regex = `${playlist_name_orig
            + space
            + bracket_open
          }(${
            num
          })${
            bracket_close}`;
          const re = new RegExp(regex, 'g');
          const res = playlist_name.match(re);
          // return res == null ? false : res[0];
          return res == null ? false : parseInt(res[0].match(/\d+(?!.*\d)/g));
        })
        .filter((n) => typeof n === 'number')
        .sort((a, b) => b - a);
      let playlist_counter = 0;
      if (playlist_found != null && playlist_copy_counters.length == 0) {
        playlist_counter = 1;
      } else if (playlist_copy_counters.length > 0) {
        playlist_counter = playlist_copy_counters[0] + 1;
      }
      playlists_copy_counter.push({
        playlist_id: playlist._id,
        counter: playlist_counter,
      });
    }
  }

  return { ...lms_course, playlists_copy_counter };
};
