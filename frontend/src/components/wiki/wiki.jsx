import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { authOperations } from "ducks/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Content, { Search } from "../content";
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
  const buildTabContent = () =>
    tabs.map((tab, index) => {
      if (tab.type === "text/article") {
        return (
          <Content
            key={tab.id}
            index={index}
            activeTabId={activeTabId}
            title={tab.title}
            text={tab.text}
          />
        );
      }
      if (tab.type === "search/results") {
        return (
          <Search
            key={`Search Results ${index}`}
            index={index}
            title={tab.title}
            activeTabId={activeTabId}
            results={tab.results}
          />
        );
      }
      return (
        <Content
          key={`Error ${index}`}
          index={index}
          activeTabId={activeTabId}
          title="Woops"
          text={`Something went wrong. We are sorry. We couldn't recognize type ${tab.type}`}
        />
      );
    });

  return (
    <div className={classes.root}>
      <Header toggleDrawer={toggleDrawer} />
      <Tabs toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">{buildTabContent()}</Container>
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
