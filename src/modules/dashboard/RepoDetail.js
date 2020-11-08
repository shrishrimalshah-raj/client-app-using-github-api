import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import {
  Link,
  Tooltip,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//icons
import IconButton from "@material-ui/core/IconButton";
import BugReportIcon from "@material-ui/icons/BugReport";
import PeopleIcon from "@material-ui/icons/People";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

//config
import { config } from "../../config";
import { githubUserOptions, options } from "./mocks";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RepoDetail = () => {
  const classes = useStyles();
  const [repoDetail, setRepoDetail] = useState({});
  let id = "";
  let location = useLocation();
  if (location.state) {
    id = location.state.id;
  }

  const getRepoDetailsByID = async () => {
    try {
      const repo = await axios.get(`${config.githubURL}/repos/${id}`);
      setRepoDetail(repo.data);
    } catch (error) {
      console.log("error getUserDataByName ******", error);
    }
  };

  useEffect(() => {
    if (id !== "") {
      getRepoDetailsByID();
    }
  }, [id]);

  let homeURL = "https://shrishrimalshah-raj.github.io/client-app-using-github-api";
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      {Object.keys(repoDetail).length !== 0 &&
      repoDetail.constructor === Object ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {repoDetail.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {repoDetail.description !== ""
                ? repoDetail.description
                : "No Description mentioned"}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              last commited at:{" "}
              {new Date(repoDetail["pushed_at"]).toLocaleDateString(
                "en-US",
                options
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <Box alignSelf="flex-start" flexGrow={1}>
              <Tooltip title="Issues">
                <IconButton aria-label="add to favorites">
                  {repoDetail["open_issues"]} <BugReportIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Forks">
                <IconButton aria-label="share">
                  {repoDetail["forks"]} <PeopleIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box alignSelf="flex-end">
              <Link href={homeURL}>
                <Tooltip title="Github Link">
                  <IconButton aria-label="share">Back to Home</IconButton>
                </Tooltip>
              </Link>
            </Box>
          </CardActions>
        </Card>
      ) : (
        <Link href={homeURL}>
          <Tooltip title="Github Link">
            <IconButton aria-label="share">Back to Home</IconButton>
          </Tooltip>
        </Link>
      )}
    </div>
  );
};

export default RepoDetail;
