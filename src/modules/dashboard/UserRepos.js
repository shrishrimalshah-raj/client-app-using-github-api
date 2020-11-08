import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

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

const UserRepos = (props) => {
  const { userRepos } = props;
  let history = useHistory();

  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {userRepos.map((repo) => (
        <div
          style={{
            flex: "0 1 calc(33.33% - 20px) ",
            margin: "10px",
            padding: "20px",
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {repo.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {repo.description === "" || repo.description === null
                  ? "No Description mentioned"
                  : repo.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  history.push({
                    pathname: "/repos",
                    state: { id: repo["full_name"] },
                  });
                }}
              >
                More details click here
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default UserRepos;
