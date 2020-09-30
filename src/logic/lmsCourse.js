// eslint-disable-next-line import/prefer-default-export
export const prepareLmsCourse = (action, state) => {
  const lmsCourse = { ...action.lmsCourse };
  const playlistsCopyCounter = [];
  const project = { ...state }.projects.find((p) => p.name === lmsCourse.course);
  if (project !== undefined) {
    for (let index = 0; index < action.allstate.playlist.playlists.length; index += 1) {
      const playlist = action.allstate.playlist.playlists[index];
      const playlistFound = lmsCourse.playlists.find((lp) => lp === playlist.title) !== undefined
        ? playlist.title
        : null;
      const playlistCopyCounters = lmsCourse.playlists
        .map((lp) => {
          const playlistNameOrig = playlist.title;
          const playlistName = lp;
          const space = '\\s';
          const bracketOpen = '\\(';
          const bracketClose = '\\)';
          const num = '\\d+';
          const regex = `${playlistNameOrig + space + bracketOpen}(${num})${bracketClose}`;
          const re = new RegExp(regex, 'g');
          const res = playlistName.match(re);
          // return res == null ? false : res[0];
          return res == null ? false : parseInt(res[0].match(/\d+(?!.*\d)/g), 10);
        })
        .filter((n) => typeof n === 'number')
        .sort((a, b) => b - a);

      let playlistCounter = 0;
      if (playlistFound !== null && playlistCopyCounters.length === 0) {
        playlistCounter = 1;
      } else if (playlistCopyCounters.length > 0) {
        playlistCounter = playlistCopyCounters[0] + 1;
      }
      playlistsCopyCounter.push({
        playlist_id: playlist.id,
        counter: playlistCounter,
      });
    }
  } else if (action.allstate) {
    const { playlists } = { ...action.allstate }.playlist;

    for (let index = 0; index < playlists.length; index += 1) {
      const playlist = playlists[index];
      const playlistFound = lmsCourse.playlists.find((lp) => lp === playlist.title) !== undefined
        ? playlist.title
        : null;
      const playlistCopyCounters = lmsCourse.playlists
        .map((lp) => {
          const playlistNameOrig = playlist.title;
          const playlistName = lp;
          const space = '\\s';
          const bracketOpen = '\\(';
          const bracketClose = '\\)';
          const num = '\\d+';
          const regex = `${playlistNameOrig + space + bracketOpen}(${num})${bracketClose}`;
          const re = new RegExp(regex, 'g');
          const res = playlistName.match(re);
          // return res == null ? false : res[0];
          return res == null ? false : parseInt(res[0].match(/\d+(?!.*\d)/g), 10);
        })
        .filter((n) => typeof n === 'number')
        .sort((a, b) => b - a);
      let playlistCounter = 0;
      if (playlistFound != null && playlistCopyCounters.length === 0) {
        playlistCounter = 1;
      } else if (playlistCopyCounters.length > 0) {
        playlistCounter = playlistCopyCounters[0] + 1;
      }
      playlistsCopyCounter.push({
        playlist_id: playlist.id,
        counter: playlistCounter,
      });
    }
  }

  return { ...lmsCourse, playlistsCopyCounter };
};
