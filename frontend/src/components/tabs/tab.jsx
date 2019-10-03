import React from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  itemWrapper: {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    justifyContent: "space-between",
    placeContent: "end space-between"
  },
  closeButton: {},
  listItem: {
    //flexShrink: 1,
    overflow: "hidden",
    borderRight: "line"
  },
  articleSummary: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  divider: {
      height: "38px",
      alignSelf: "center"
  }
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Tab(props) {
  const { article, removeArticle, setActiveTab, tabId } = props;
  const classes = useStyles();
  return (
    <div className={classes.itemWrapper} size="small">
      <ListItem
        className={classes.listItem}
        button
        selected={article.id === tabId}
        key={article.id}
        onClick={() => setActiveTab(article.id)}
        {...a11yProps(article.id)}
      >
        <ListItemText
          className={classes.articleSummary}
          primary={article.title}
        />
      </ListItem>
      <Divider className={classes.divider} orientation="vertical" />
      <Button
        className={classes.closeButton}
        aria-label="delete"
        size="small"
        onClick={() => removeArticle(article.id)}
      >
        <CloseIcon className={classes.closeIcon} />
      </Button>
    </div>
  );
}
