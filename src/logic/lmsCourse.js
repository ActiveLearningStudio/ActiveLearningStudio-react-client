export const prepareLmsCourse = (action, state) => {
    let lms_course = {...action.lms_course};
      let playlists_copy_counter = [];
      let project = {...state}.projects.find(p => p.name === lms_course.course);
      if(project !== undefined){
        for (let index = 0; index < project.playlists.length; index++) {
          const playlist = project.playlists[index];
          const playlist_found = lms_course.playlists.find(lp => lp == playlist.title) !== undefined ? playlist.title : null;
          const playlist_copy_counters = lms_course.playlists.map(lp => {
            let playlist_name_orig = playlist.title;
            let playlist_name = lp;
            const space = '\\s', bracket_open = '\\(', bracket_close = '\\)', num = '\\d+';
            var regex = playlist_name_orig + space + bracket_open + '(' + num + ')' + bracket_close;
            var re = new RegExp(regex,"g");
            const res = playlist_name.match(re);
            //return res == null ? false : res[0];
            return res == null ? false : parseInt(res[0].match(/\d+(?!.*\d)/g));
          }).filter(n => typeof n == "number").sort((a,b) => b-a);
          let playlist_counter = 0;
          if(playlist_found != null && playlist_copy_counters.length == 0){
            playlist_counter = 1;
          }else if(playlist_copy_counters.length > 0){
            playlist_counter = playlist_copy_counters[0] + 1;
          }
          playlists_copy_counter.push({playlist_id: playlist._id, counter: playlist_counter});
        }
      }
      return {...lms_course, playlists_copy_counter};
}