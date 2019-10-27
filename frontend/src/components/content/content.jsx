import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function Content(props) {
  const { activeTabId, index, text, title } = props;
  const classes = useStyles();
  return (
    <Paper
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      hidden={index !== activeTabId}
      className={classes.root}
    >
      <Typography variant="h5" component="h3">
        {title}
      </Typography>
      <Typography component="p">{text}</Typography>
    </Paper>
  );
}
