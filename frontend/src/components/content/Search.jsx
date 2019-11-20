/* eslint-disable jsx-a11y/anchor-is-valid */
import { Chip, Collapse, Link } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { searchActions } from "ducks/search/";
import React from "react";
import { useDispatch } from "react-redux";
import Markdown from "./Markdown";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function Search(props) {
  const { activeTabId, index, results, title } = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  const fetchSelectedArticle = articleTitle => {
    dispatch(
      searchActions.getArticleRequest({
        title: articleTitle,
        focus: true,
        location: "autosuggest"
      })
    );
  };
  const openNewTab = article => event => {
    event.preventDefault();
    fetchSelectedArticle(article);
  };
  const renderChips = tags => (
    <>
      {tags.map((tag, i) => (
        <Chip size="small" label={tag} key={tag} />
      ))}
    </>
  );

  return (
    <Paper
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      hidden={index !== activeTabId}
      className={classes.root}
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      {results.map(result => (
        <div key={result.title}>
          <Typography variant="h5" component="h2">
            <Link
              href="#"
              value={result.title}
              onClick={openNewTab(result.title)}
            >
              {result.title}
            </Link>
          </Typography>
          {renderChips(result.tags)}
          <Collapse collapsedHeight="40px">
            <Markdown source={result.text.slice(0, 500)} noRequests />
          </Collapse>
          <Divider />
        </div>
      ))}
    </Paper>
  );
}
