import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  articleSummary: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    height: "auto"
  },
  close: {
    height: "100%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    "& :hover": {
      background: theme.palette.action.selected
    }
  },
  divider: {
    height: "38px",
    alignSelf: "center"
  },
  listItem: {
    display: "inherit",
    width: "inherit",
    // flexShrink: 1,
    overflow: "hidden",
    borderRight: "line"
  }
}));

export default function TabContent(props) {
  const { title } = props;
  const classes = useStyles();

  return (
    <div id="tab" className={classes.listItem}>
      <div id="content" className={classes.articleSummary}>
        {title}
      </div>
      <div className={classes.close} id="closeTab">
        <CloseIcon id="closeTab" />
      </div>
    </div>
  );
}
