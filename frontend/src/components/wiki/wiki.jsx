import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Header from "components/menues/header";
import Tabs from "components/tabs";
import Article from "components/article";

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
  const [tabId, setActiveTabById] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [articlesJson, setArticlesJson] = React.useState([]);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }
  function setActiveTab(id) {
    setActiveTabById(id);
  }

  const url = "https://jsonplaceholder.typicode.com/users/2/posts";
  React.useEffect(() => {
    const loadData = async url => {
      const response = await fetch(url);
      const json = await response.json();
      console.log("Updating Articles");
      setArticlesJson(json);
    };
    loadData(url);
  }, [url]);

  const buildArticles = articlesJson =>
    articlesJson.map(article => (
      <Article
        key={article.id}
        index={article.id}
        value={tabId}
        title={article.title}
        text={article.body}
      />
    ));

  return (
    <div className={classes.root}>
      <Header toggleDrawer={toggleDrawer} />
      <Tabs
        articles={articlesJson}
        setActiveTab={setActiveTab}
        tabId={tabId}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        setArticlesJson={setArticlesJson}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">{buildArticles(articlesJson)}</Container>
      </main>
    </div>
  );
}
