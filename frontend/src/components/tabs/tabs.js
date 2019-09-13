import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
    padding: theme.spacing(3, 0, 6)
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
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
    width: drawerWidth
  }
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Tabs(props) {
  const {
    articles,
    container,
    setTabId,
    tabId,
    drawerOpen,
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
      <div className={classes.list} onClick={eventDummy} onKeyDown={eventDummy}>
        <div className={classes.toolbar} />
        <List>
          {articles.map((text, index) => (
            <ListItem
              button
              selected={index === tabId}
              key={index}
              onClick={() => setTabId(index)}
              {...a11yProps(index)}
            >
              <ListItemText primary={"Article " + index} />
            </ListItem>
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
            keepMounted: true // Better open performance on mobile.
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
