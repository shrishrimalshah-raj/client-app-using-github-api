import axios from "axios";

import { config } from "../../config";
import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR,
  SET_SELECTED_USER,
  SET_USER_DETAIL,
  SET_USER_REPOS,
} from "./githubType";

//actions
const searchUserRequest = () => {
  return {
    type: SEARCH_USER_REQUEST,
  };
};

const searchUserSuccess = (users) => {
  return {
    type: SEARCH_USER_SUCCESS,
    payload: users,
  };
};

const searchUserError = (error) => {
  return {
    type: SEARCH_USER_ERROR,
    payload: error,
  };
};

const setSelectedUser = (user) => {
  return {
    type: SET_SELECTED_USER,
    payload: user,
  };
};

const setUserDetail = (user) => {
  return {
    type: SET_USER_DETAIL,
    payload: user,
  };
};

const setUserRepos = (repos) => {
  return {
    type: SET_USER_REPOS,
    payload: repos,
  };
};

//call API
const searchUsersList = (user) => {
  return async (dispatch) => {
    dispatch(searchUserRequest());
    try {
      const users = await axios.get(
        `${config.githubURL}/search/users?q=${user}`
      );
      dispatch(searchUserSuccess(users.data.items));
    } catch (error) {
      dispatch(searchUserError(error.message));
    }
  };
};

export { searchUsersList, setSelectedUser, setUserDetail, setUserRepos };
