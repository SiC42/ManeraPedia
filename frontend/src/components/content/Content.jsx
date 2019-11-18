import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Article from "./article/Article";
import Editor from "./editor/Editor";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    "& > *": {
      margin: theme.spacing(0.5) // spacing for the tags
    }
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
  const [title, setTitle] = useState(_title);
  const [text, setText] = useState(_text);
  const [inEditMode, setInEditMode] = useState(_edit);
  const [tags, setTags] = useState(_tags);
  const [modified, setModified] = useState(_modified);
  const [modifier, setModifier] = useState(_modifier);
  const [cache, setCache] = useState({ text: "", tags: {}, title: "" });
  const username = useSelector(state => state.auth.info.username);

  const cancelEdit = () => {
    setInEditMode(false);
    setText(cache.text);
    setTags(cache.tags);
    setTitle(cache.title);
  };

  const saveArticle = () => {
    setInEditMode(false);
    setModified(Date.now());
    setModifier(username);
  };

  const startEdit = () => {
    setCache({ text, tags, title });
    setInEditMode(true);
  };

  return (
    <Paper className={classes.root} hidden={index !== activeTabId}>
      {inEditMode ? (
        <Editor
          cancelEdit={cancelEdit}
          tags={tags}
          text={text}
          title={title}
          setTags={setTags}
          setText={setText}
          setTitle={setTitle}
          saveArticle={saveArticle}
        />
      ) : (
        <Article
          index={index}
          modified={modified}
          modifier={modifier}
          startEdit={startEdit}
          tags={tags}
          text={text}
          title={title}
        />
      )}
    </Paper>
  );
}

Content.defaultProps = {
  tags: [],
  modifier: "",
  modified: "",
  edit: false
};
