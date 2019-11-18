import {
  Chip,
  IconButton,
  Grid,
  TextField,
  InputBase
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import React, { useState, useRef } from "react";
import AddIcon from "@material-ui/icons/Add";

import Markdown from "../Markdown";

const useStyles = makeStyles(theme => ({
  icons: {
    float: "right"
  },
  margin: {
    margin: theme.spacing(0.2)
  },
  tagInput: {
    fontSize: theme.typography.pxToRem(13)
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

export default function Editor(props) {
  const {
    cancelEdit,
    tags,
    text,
    title,
    setTags,
    setText,
    setTitle,
    saveArticle
  } = props;
  const classes = useStyles();
  const [tagName, setTagName] = useState("");
  const tagInputRef = useRef(null);

  const commitTagName = input => {
    setTags([...tags, tagName]);
    setTagName("");
    // eslint-disable-next-line no-param-reassign
    input.value = "";
  };

  const handleEnter = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitTagName(event.target);
    }
  };

  const ArticleButtons = () => {
    return (
      <>
        <IconButton size="small" aria-label="add" className={classes.margin}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="add"
          className={classes.margin}
          onClick={cancelEdit}
        >
          <CancelIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="add"
          className={classes.margin}
          onClick={saveArticle}
        >
          <CheckIcon />
        </IconButton>
      </>
    );
  };

  const renderChips = () => (
    <>
      {tags.map((tag, i) => (
        <Chip
          size="small"
          label={tag}
          key={tag}
          onDelete={() => setTags(tags.filter((_, j) => j !== i))}
        />
      ))}
      <Chip
        size="small"
        key="NewTag"
        onDelete={() => commitTagName(tagInputRef.current)}
        deleteIcon={<AddIcon />}
        label={
          <InputBase
            key="tag-name-input"
            defaultValue={tagName}
            className={classes.tagInput}
            onChange={event => setTagName(event.target.value)}
            onKeyPress={handleEnter}
            inputRef={tagInputRef}
          />
        }
      />
    </>
  );

  return (
    <>
      <div className={classes.titlebar}>
        <span className={classes.icons}>
          <ArticleButtons />
        </span>
        <TextField
          id="outlined-basic"
          InputProps={{ className: classes.title }}
          component="h1"
          multiline
          defaultValue={title}
          fullWidth
          variant="outlined"
          onKeyPress={event => event.key === "Enter" && event.preventDefault()}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      {renderChips() /* Necessary to not lose focus on input */}
      <Grid container spacing={0} id="simple-tabpanel-edit">
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
            onChange={event => setText(event.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <Markdown markdown={text} />
        </Grid>
      </Grid>
    </>
  );
}

Editor.defaultProps = {
  tags: [],
  modifier: "",
  modified: ""
};
