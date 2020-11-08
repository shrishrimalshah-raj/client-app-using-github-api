import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR,
  SET_SELECTED_USER,
  SET_USER_DETAIL,
  SET_USER_REPOS,
} from "./githubType";

const initialState = {
  usersList: [],
  loading: false,
  error: "",
  selectedUser: "",
  userDetail: {},
  userRepos: [],
};

const githubReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        usersList: action.payload,
        error: "",
      };
    case SEARCH_USER_ERROR:
      return {
        ...state,
        loading: false,
        usersList: [],
        error: action.payload,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case SET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case SET_USER_REPOS:
      return {
        ...state,
        userRepos: action.payload,
      };
    default:
      return state;
  }
};

export { githubReducer };
