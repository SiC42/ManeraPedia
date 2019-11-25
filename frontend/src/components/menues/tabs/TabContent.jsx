import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  articleSummary: {
    textTransform: "none",
    height: "auto",
    minWidth: 100,
    flexGrow: 1,
    textAlign: "left"
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
    overflow: "hidden"
  }
}));

export default function TabContent(props) {
  const { title } = props;
  const classes = useStyles();

  return (
    <div id="tab" className={classes.listItem}>
      <Typography variant="body2" className={classes.articleSummary} noWrap>
        {title}
      </Typography>
      <div className={classes.close} id="closeTab">
        <CloseIcon id="closeTab" />
      </div>
    </div>
  );
}
