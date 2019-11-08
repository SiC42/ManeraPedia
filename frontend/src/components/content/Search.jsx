import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function Search(props) {
  const { activeTabId, index, results, title } = props;
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
      {results.map(result => (
        <>
          <Typography variant="h5" component="h2">
            {result.title}
          </Typography>
          <Typography component="p" color="textSecondary">
            {result.tags}
          </Typography>
          <Typography component="p" className={classes.body} noWrap>
            {result.text}
          </Typography>
        </>
      ))}
    </Paper>
  );
}
