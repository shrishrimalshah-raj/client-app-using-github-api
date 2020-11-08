import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

//config
import { config } from "../../config";

//action
import {
  searchUsersList,
  setSelectedUser,
  setUserDetail,
  setUserRepos,
} from "../../redux/github";

//custom component
import UserProfile from "./UserProfile";
import UserRepos from "./UserRepos";

import { githubUserOptions } from "./mocks";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 30,
  },
});

const SearchUsers = (props) => {
  const state = useSelector((state) => ({ ...state }));
  const { selectedUser, userDetail, userRepos } = state;

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = async (newValue) => {
    setInputValue(newValue);
  };

  const filterUsers = () => {
    let newUsers = [];
    if (state.usersList) {
      newUsers = state.usersList.map((user) => ({
        label: user.login,
        value: user.login,
      }));
    }
    return newUsers;
  };

  const promiseOptions = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterUsers());
      }, 1000);
    });

  const getUserDataByName = async () => {
    try {
      const user = await axios.get(`${config.githubURL}/users/${selectedUser}`);
      dispatch(setUserDetail(user.data));
    } catch (error) {
      console.log("error getUserDataByName ******", error);
    }
  };

  const getUserReposByName = async () => {
    try {
      const repos = await axios.get(
        `${config.githubURL}/users/${selectedUser}/repos`
      );
      dispatch(setUserRepos(repos.data));
    } catch (error) {
      console.log("error getUserReposByName ******", error);
    }
  };

  useEffect(() => {
    if (inputValue !== "") {
      dispatch(searchUsersList(inputValue));
    }
  }, [inputValue]);

  useEffect(() => {
    if (selectedUser !== "") {
      getUserDataByName();
      getUserReposByName();
    }
  }, [selectedUser]);

  const classes = useStyles();

  return (
    <div>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "500px",
          }}
          className={classes.pos}
        >
          <AsyncSelect
            cacheOptions
            defaultOptions={githubUserOptions}
            loadOptions={promiseOptions}
            onInputChange={handleInputChange}
            onChange={(e) => {
              dispatch(setSelectedUser(e.label));
            }}
            placeholder="Search github username"
          />
        </div>

        {Object.keys(userDetail).length !== 0 &&
        userDetail.constructor === Object ? (
          <div className={classes.pos}>
            <UserProfile user={userDetail} />
          </div>
        ) : (
          <div>
            <br />
            Please search or select user from dropdown
          </div>
        )}
      </div>

      {userRepos.length > 0 && <UserRepos userRepos={userRepos} />}
    </div>
  );
};

export default SearchUsers;
