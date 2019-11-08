import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Chip, Link } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { searchOperations } from "ducks/search/";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    "& > *": {
      margin: theme.spacing(0.5) // spacing for the chips
    }
  }
}));

export default function Content(props) {
  const { activeTabId, index, modified, modifier, tags, text, title } = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  const fetchSelectedArticle = _title => {
    dispatch(
      searchOperations.getArticleRequestFromAutocomplete({
        title: _title,
        focus: true
      })
    );
  };

  const openNewTab = article => event => {
    event.preventDefault();
    fetchSelectedArticle(article);
  };

  const renderLinkForAction = linkProps => {
    const { href, children } = linkProps;
    if (href === "") {
      const article = children[0].props.value;
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link href="#" value={article} onClick={openNewTab(article)}>
          {article}
        </Link>
      );
    }
    console.log(linkProps);
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        hello word
      </a>
    );
  };

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
      <Typography variant="caption" display="block" gutterBottom>
        {`${modifier} - ${new Date(modified).toTimeString()}`}
      </Typography>
      {tags.map(tag => (
        <Chip size="small" label={tag} key={tag} />
      ))}
      <ReactMarkdown
        source={text}
        renderers={{ linkReference: renderLinkForAction }}
      />
    </Paper>
  );
}

Content.defaultProps = {
  tags: [],
  modifier: "",
  modified: ""
};
