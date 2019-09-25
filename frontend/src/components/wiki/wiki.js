import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";

import Header from 'components/menues/header.js'
import Tabs from "components/tabs";
import Article from "components/article";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    flexGrow: 1,
    backgroundColor: theme.palette.grey[200],
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Wiki() {
  const classes = useStyles();
  const [tabId, setTabId] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  let articles = [];
  for (let i = 0; i < 40; i++) {
    articles.push(<Article key={i} index={i} value={tabId} />);
  }
  return (
    <div className={classes.root}>
      <Header toggleDrawer={toggleDrawer}/>
      <Tabs
        articles={articles}
        setTabId={setTabId}
        tabId={tabId}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
      />
      <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Container maxWidth="md">
      {articles}
      </Container>
      </main>
    </div>
  );
}
