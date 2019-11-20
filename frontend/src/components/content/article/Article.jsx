import { Chip, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { tabActions } from "ducks/tabs";
import React from "react";
import { useDispatch } from "react-redux";
import Markdown from "../Markdown";

const useStyles = makeStyles(theme => ({
  icons: {
    float: "right"
  },
  margin: {
    margin: theme.spacing(0.2)
  },
  title: {
    flexShrink: 1,
    height: "auto",
    ...theme.typography.h4
  },
  titlebar: {
    display: "block"
  }
}));

export default function Article(props) {
  const { index, modified, modifier, startEdit, tags, text, title } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const ArticleButtons = () => {
    return (
      <>
        <IconButton size="small" aria-label="add" className={classes.margin}>
          <KeyboardArrowDownIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="add"
          className={classes.margin}
          onClick={startEdit}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="add"
          className={classes.margin}
          onClick={() => dispatch(tabActions.remove(index))}
        >
          <CloseIcon />
        </IconButton>
      </>
    );
  };

  const Chips = () => (
    <>
      {tags.map((tag, i) => (
        <Chip size="small" label={tag} key={tag} />
      ))}
    </>
  );

  return (
    <>
      <div className={classes.titlebar}>
        <span className={classes.icons}>
          <ArticleButtons />
        </span>
        <Typography className={classes.title} variant="h4" component="h1">
          {title}
        </Typography>
      </div>
      <Typography variant="caption" display="block" gutterBottom>
        {`${modifier} - ${new Date(modified).toTimeString()}`}
      </Typography>
      <Chips />
      <Grid
        container
        spacing={0}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <Grid item xs={12}>
          <Markdown source={text} />
        </Grid>
      </Grid>
    </>
  );
}

Article.defaultProps = {
  tags: [],
  modifier: "",
  modified: ""
};
