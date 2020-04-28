import { SHOW_CREATE_PROJECT_SUBMENU, SHOW_CREATE_PROJECT_MODAL, CREATE_PROJECT, LOAD_MY_PROJECTS, HIDE_CREATE_PROJECT_MODAL } from "../constants/actionTypes";


const defaultProgramState = () => {
  if (localStorage.getItem("projects")) {
//      console.log("---");
//      console.log(localStorage.getItem("playlists"));
    //  localStorage.clear();
        
    return {
        'projects':JSON.parse(localStorage.getItem("projects"))
    }
  } else {
    return {
        'projects':[],
        showCreateProjectSubmenu:false,
        showCreateProjectPopup:false
    };
  }
};

const projectReducer = (state = defaultProgramState(), action) => {
  switch (action.type) {
    
    case SHOW_CREATE_PROJECT_SUBMENU:
      return {
        ...state,
        showCreateProjectSubmenu: !state.showCreateProjectSubmenu
      };
    case SHOW_CREATE_PROJECT_MODAL:
      return {
        ...state,
        showCreateProjectPopup: true
      };
    // case HIDE_CREATE_PROJECT_MODAL:
    //   return {
    //     ...state,
    //     showCreateProjectPopup: false
    //   };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [
          action.projectdata,
          ...state.projects
        ]
      };
    case LOAD_MY_PROJECTS:
      return {
        ...state,
        projects: action.projects
      };
    default:
      return state;
  }
};

export default projectReducer;
