import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { authOperations } from "ducks/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../content";
import Header from "../menues/header";
import Snackbar from "../menues/snackbar";
import Tabs from "../menues/tabs";

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
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const tabs = useSelector(state => state.tabs.list);
  const activeTabId = useSelector(state =>
    state.tabs.activeTabId ? state.tabs.activeTabId : 0
  );
  const dispatch = useDispatch();

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }
  const open = useSelector(state => state.auth && state.auth.loginError);
  const message = useSelector(state => state.auth && state.auth.message);
  const clearError = () => {
    dispatch(authOperations.clearLoginError());
  };
  const buildArticles = articleList =>
    articleList.map((article, index) => (
      <Content
        key={article.id}
        index={index}
        activeTabId={activeTabId}
        title={article.title}
        text={article.text}
      />
    ));

  return (
    <div className={classes.root}>
      <Header toggleDrawer={toggleDrawer} />
      <Tabs toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">{buildArticles(tabs)}</Container>
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
