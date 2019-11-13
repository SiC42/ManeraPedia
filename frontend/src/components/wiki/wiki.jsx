import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { authActions } from "ducks/auth";
import { tabActions } from "ducks/tabs";
import { useDispatch, useSelector } from "react-redux";
import Content, { Search } from "../content";
import Header from "../menues/header";
import Snackbar from "../menues/snackbar";
import Tabs, { drawerWidth } from "../menues/tabs";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    width: "100vw",
    maxWidth: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.grey[200],
    display: "flex"
  },
  content: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100vw - ${drawerWidth}px)`
    },
    justifyContent: "center"
  },
  toolbar: {
    width: "100%",
    ...theme.mixins.toolbar
  }
}));
const defaultTab = {
  created: "2019-01-31T11:50:58",
  creator: "sascha",
  id: `Tevv7W0BbIDzQhiPeGZx-1`,
  modified: "2019-01-31T11:59:51",
  modifier: "SiC",
  tags: ["Journal", "[[Gruppe 1]]"],
  text:
    "\n# Überschrift\n## Überschrift 2\n\n1. Nummernliste\n* Liste\n* Liste in Liste\n\n| This is a Table | Is it?| Is it not?|\n| --- | --- | --- |\n| Some Data |<|\n\n**Bold** _italic_ ~~strikethrough~~ underlined\n\n[[Links]]\n\n[[Links next to]] [[Each other]]\n\n[[Linktext|Links to this article]]\n\n[Actual Link text](https://www.actual-link.de)\n\nwww.actual-second-link.de\n\n{{References}}\n\nLong sentences so we know that we hve all the space in the world and it renders just like we want to. Some more text for big screen. Is this enough alread? :O",
  title: `22.01.2019 - Ein neuer Gefährte für den weiten weiten Weg -1`,
  type: "text/vnd.tiddlywiki"
};

export default function Wiki() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tabActions.add(defaultTab));
  }, []);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const tabs = useSelector(state => state.tabs.list);
  const activeTabId = useSelector(state =>
    state.tabs.activeTabId ? state.tabs.activeTabId : 0
  );

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }
  const open = useSelector(state => state.auth && state.auth.loginError);
  const message = useSelector(state => state.auth && state.auth.message);
  const clearError = () => {
    dispatch(authActions.clearLoginError());
  };
  const buildTabContent = () =>
    tabs.map((tab, index) => {
      if (tab.type === "text/article") {
        return (
          <Content
            key={tab.id}
            index={index}
            activeTabId={activeTabId}
            {...tab}
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
          {...tab}
        />
      );
    });

  return (
    <div className={classes.root}>
      <Header toggleDrawer={toggleDrawer} />
      {tabs.length > 0 && (
        <Tabs toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      )}
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
