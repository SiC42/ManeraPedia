import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Article from "components/article";
import ArticleTabs from "./article_tabs";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[200]
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));

export default function Content(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleChange(newValue) {
    setValue(newValue);
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  let articles = [];
  for (let i = 0; i < 10; i++) {
    articles.push(<Article key={i} index={i} value={value} />);
  }

  return (
    <div className={classes.root}>
      <ArticleTabs
        handleChange={handleChange}
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container maxWidth="md">
        {articles}
      </Container>
      </main>
    </div>
  );
}
