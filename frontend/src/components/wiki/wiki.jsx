import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Header from "../menues/header";
import Tabs from "../menues/tabs";
import Article from "../article";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "../menues/snackbar";
import { authOperations } from "ducks/auth";

//import fetchData from "wiki_fetch";

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
  toolbar: theme.mixins.toolbar
}));

export default function Wiki() {
  const classes = useStyles();
  const [activeTabId, setActiveTab] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }
  const open = useSelector(state => state.auth && state.auth.loginError);
  const message = useSelector(state => state.auth && state.auth.message);
  const dispatch = useDispatch();
  const clearError = () => {
    dispatch(authOperations.clearLoginError());
  };

  const articlesJson = useSelector(state => state.tabs);
  const buildArticles = articleList =>
    articleList.map((article, index) => (
      <Article
        key={index}
        index={index}
        activeTabId={activeTabId}
        title={article.title}
        text={article.text}
      />
    ));

  return (
    <div className={classes.root}>
      <Header toggleDrawer={toggleDrawer} />
      <Tabs
        articles={articlesJson}
        setActiveTab={setActiveTab}
        activeTabId={activeTabId}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">{buildArticles(articlesJson)}</Container>
        <Snackbar
          open={open}
          setOpen={clearError}
          variant="error"
          message={message}
        />
      </main>
    </div>
  );
}
