import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function LoadingPage(props) {
  const { activeTabId, index, title } = props;
  const classes = useStyles();
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
      <Skeleton width="100%" height={600} />
    </Paper>
  );
}
