import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { tabActions } from "actions";
import React from "react";
import { useDispatch } from "react-redux";




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
  const { title, tabId, setActiveTab, activeTabId } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const removeTab = id => {
    dispatch(tabActions.remove(id));
  };

  return (
    <div className={classes.itemWrapper} size="small">
      <ListItem
        className={classes.listItem}
        button
        selected={tabId === activeTabId}
        key={tabId}
        onClick={() => setActiveTab(tabId)}
        {...a11yProps(tabId)}
      >
        <ListItemText
          className={classes.articleSummary}
          primary={title}
        />
      </ListItem>
      <Divider className={classes.divider} orientation="vertical" />
      <Button
        className={classes.closeButton}
        aria-label="delete"
        size="small"
        onClick={() => removeTab(tabId)}
      >
        <CloseIcon className={classes.closeIcon} />
      </Button>
    </div>
  );
}
