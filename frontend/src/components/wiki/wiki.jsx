import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { authOperations } from "ducks/auth";
import { tabOperations } from "ducks/tab";
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
  const [activeTabId, setActiveTab] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const tabs = useSelector(state => state.tabs);
  const dispatch = useDispatch();
  const changeTabs = (event, newActiveTabId) => {
    console.log(event.target.id);
    console.log(newActiveTabId);
    if (event.target.id === "closeTab") {
      if (activeTabId >= tabs.length - 1) {
        setActiveTab(activeTabId - 1);
      }
      dispatch(tabOperations.remove(newActiveTabId));
    } else {
      setActiveTab(newActiveTabId);
    }
  };

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
      <Tabs
        articles={tabs}
        changeActiveTab={changeTabs}
        activeTabId={activeTabId}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
      />
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
