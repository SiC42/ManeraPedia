import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import Tab from "./tab";

const maxDrawerWidth = 450;
const useStyles = makeStyles(theme => ({
  itemWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    placeContent: "end space-between"
  },
  closeButton: {},
  listItem: {
    flexShrink: 1,
    overflow: "hidden",
    borderRight: "line"
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
    setActiveTab,
    activeTabId,
    toggleDrawer
  } = props;
  const classes = useStyles();
  const theme = useTheme();


  const setDrawer = mobile => {
    let eventDummy;
    if (mobile) {
      eventDummy = toggleDrawer;
    } else {
      eventDummy = () => {};
    }

    return (
      <div className={classes.tabs} onClick={eventDummy} onKeyDown={eventDummy}>
        <div className={classes.toolbar} />
        <List>
          {articles.map((article, index) => (
            <div key={index}>
              <Tab
                title={article.title}
                tabId={index}
                setActiveTab={setActiveTab}
                activeTabId={activeTabId}
              />
              <Divider />
            </div>
          ))}
        </List>
      </div>
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
