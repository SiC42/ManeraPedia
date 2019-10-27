import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import MaterialTabs from "@material-ui/core/Tabs";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import Tab from "@material-ui/core/Tab";
import TabContent from "./tab";

const maxDrawerWidth = 450;
const useStyles = makeStyles(theme => ({
  itemWrapper: {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    placeContent: "end space-between",
    paddingRight: 0
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: maxDrawerWidth,
      flexShrink: 0
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
    maxWidth: maxDrawerWidth
  }
}));

export default function Tabs(props) {
  const {
    articles,
    container,
    drawerOpen,
    changeActiveTab,
    activeTabId,
    toggleDrawer
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const setDrawer = () => {
    return (
      <>
        <div className={classes.toolbar} />
        <MaterialTabs
          orientation="vertical"
          variant="scrollable"
          value={activeTabId}
          onChange={changeActiveTab}
          aria-label="Vertical menu tabs"
          className={classes.tabs}
        >
          {articles.map((article, index) => (
            <Tab
              label={<TabContent title={article.title} />}
              key={article.id}
              title={article.title}
              index={index}
              className={classes.itemWrapper}
            />
          ))}
        </MaterialTabs>
      </>
    );
  };

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={drawerOpen}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            style: { zIndex: 1 } // Get it behind the Nav Bar
          }}
        >
          {setDrawer(true)}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {setDrawer(false)}
        </Drawer>
      </Hidden>
    </nav>
  );
}
