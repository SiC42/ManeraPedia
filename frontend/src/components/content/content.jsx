import { Chip, IconButton, Grid, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";

import { tabActions } from "ducks/tabs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Markdown from "./Markdown";

const useStyles = makeStyles(theme => ({
  icons: {
    float: "right"
  },
  margin: {
    margin: theme.spacing(0.2)
  },
  root: {
    padding: theme.spacing(3, 2),
    "& > *": {
      margin: theme.spacing(0.5) // spacing for the tags
    }
  },
  title: {
    flexShrink: 1
  },
  titlebar: {
    display: "block"
  }
}));

export default function Content(props) {
  const {
    activeTabId,
    edit: _edit,
    index,
    modified,
    modifier,
    tags,
    text: _text,
    title
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, setText] = useState(_text);
  const [edit, setEdit] = useState(_edit);

  const renderArticleButtons = () => {
    if (edit) {
      return (
        <>
          <IconButton size="small" aria-label="add" className={classes.margin}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="add"
            className={classes.margin}
            onClick={() => setEdit(false)}
          >
            <CancelIcon />
          </IconButton>
          <IconButton size="small" aria-label="add" className={classes.margin}>
            <CheckIcon />
          </IconButton>
        </>
      );
    }
    return (
      <>
        <IconButton size="small" aria-label="add" className={classes.margin}>
          <KeyboardArrowDownIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="add"
          className={classes.margin}
          onClick={() => setEdit(true)}
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

  const changeInput = event => {
    setText(event.target.value);
  };

  return (
    <Paper className={classes.root} hidden={index !== activeTabId}>
      <div className={classes.titlebar}>
        <span className={classes.icons}>{renderArticleButtons()}</span>
        <Typography className={classes.title} variant="h4" component="h1">
          {title}
        </Typography>
      </div>
      <Typography variant="caption" display="block" gutterBottom>
        {`${modifier} - ${new Date(modified).toTimeString()}`}
      </Typography>
      {tags.map(tag => (
        <Chip size="small" label={tag} key={tag} />
      ))}
      <Grid
        container
        spacing={0}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        hidden={index !== activeTabId}
      >
        {edit && (
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="Edit"
              multiline
              fullWidth
              defaultValue={text}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={changeInput}
            />
          </Grid>
        )}
        <Grid item xs={edit ? 6 : 12}>
          <Markdown markdown={text} inEditMode={edit} />
        </Grid>
      </Grid>
    </Paper>
  );
}

Content.defaultProps = {
  tags: [],
  modifier: "",
  modified: "",
  edit: false
};
