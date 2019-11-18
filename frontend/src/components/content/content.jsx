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
import { useDispatch, useSelector } from "react-redux";
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
    flexShrink: 1,
    fontSize: theme.typography.h4.fontSize,
    height: "auto"
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
    modified: _modified,
    modifier: _modifier,
    tags: _tags,
    text: _text,
    title: _title
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(_title);
  const [text, setText] = useState(_text);
  const [edit, setEdit] = useState(_edit);
  const [tags, setTags] = useState(_tags);
  const [modified, setModified] = useState(_modified);
  const [modifier, setModifier] = useState(_modifier);
  const [cache, setCache] = useState({ text: "", tags: {}, title: "" });
  const username = useSelector(state => state.auth.info.username);

  const cancel = () => {
    setEdit(false);
    setText(cache.text);
    setTags(cache.tags);
    setTitle(cache.title);
  };

  const save = () => {
    setEdit(false);
    setModified(Date.now());
    setModifier(username);
  };

  const startEdit = () => {
    setCache({ text, tags, title });
    setEdit(true);
  };

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
            onClick={cancel}
          >
            <CancelIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="add"
            className={classes.margin}
            onClick={save}
          >
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

  const changeText = event => {
    setText(event.target.value);
  };

  const changeTitle = event => {
    setTitle(event.target.value);
  };

  const renderTitle = () => {
    if (!edit) {
      return (
        <Typography className={classes.title} variant="h4" component="h1">
          {title}
        </Typography>
      );
    }
    return (
      <TextField
        id="outlined-basic"
        InputProps={{ className: classes.title }}
        component="h1"
        multiline
        defaultValue={title}
        fullWidth
        variant="outlined"
        onKeyPress={event => event.key === "Enter" && event.preventDefault()}
        onChange={changeTitle}
      />
    );
  };

  return (
    <Paper className={classes.root} hidden={index !== activeTabId}>
      <div className={classes.titlebar}>
        <span className={classes.icons}>{renderArticleButtons()}</span>
        {renderTitle() /* This has to be function or else it will lose focus in edit-mode */}
      </div>
      {!edit && (
        <Typography variant="caption" display="block" gutterBottom>
          {`${modifier} - ${new Date(modified).toTimeString()}`}
        </Typography>
      )}
      {tags.map((tag, i) => (
        <Chip
          size="small"
          clickable={!edit}
          label={tag}
          key={tag}
          onDelete={
            edit
              ? () => {
                  setTags(tags.filter((_, j) => j !== i));
                }
              : undefined
          }
        />
      ))}
      {edit && (
        <Chip size="small" color="primary" clickable label="+" key="Plus" />
      )}
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
              onChange={changeText}
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
