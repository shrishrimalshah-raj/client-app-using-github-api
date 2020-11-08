import React from "react";
import {
  Tooltip,
  Box,
  Link,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//icons
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PeopleIcon from "@material-ui/icons/People";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

//internal
import { options } from "./mocks";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const UserProfile = (props) => {
  const { user } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={user["login"]}
        subheader={new Date(user["created_at"]).toLocaleDateString(
          "en-US",
          options
        )}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={user["avatar_url"] || ""}
          src={user["avatar_url"] || ""}
          title={user["login"]}
        />
      </CardActionArea>
      <CardActions>
        <Box alignSelf="flex-start" flexGrow={1}>
          <Tooltip title="Followers">
            <IconButton aria-label="add to favorites">
              {user["followers"]} <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Following">
            <IconButton aria-label="share">
              {user["following"]} <PeopleIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box alignSelf="flex-end">
          <Link href={user["html_url"]} target="_blank" rel="noopener">
            <Tooltip title="Github Link">
              <IconButton aria-label="share">
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
};

export default UserProfile;
