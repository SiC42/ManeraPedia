import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import MaterialTabs from "@material-ui/core/Tabs";
import { tabsActions } from "ducks/tabs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TabContent from "./tab";

export const drawerWidth = 350;
const useStyles = makeStyles(theme => ({
  itemWrapper: {
    display: "flex",
    alignItems: "stretch",
    height: "100%",
    justifyContent: "space-between",
    placeContent: "end space-between",
    paddingRight: 0,
    minWidth: "100%",
    width: "100%"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));

export default function Tabs(props) {
  const { container, drawerOpen, toggleDrawer } = props;
  const classes = useStyles();
  const theme = useTheme();

  const activeTabId = useSelector(state => state.tabs.activeTabId);
  const tabs = useSelector(state => {
    return state.tabs.list ? state.tabs.list : [];
  });

  const dispatch = useDispatch();
  const changeActiveTab = (event, newActiveTab) => {
    if (event.target.id === "closeTab") {
      dispatch(tabsActions.remove(newActiveTab));
    } else {
      dispatch(tabsActions.changeActiveTab(newActiveTab));
    }
  };

  const getDrawer = () => (
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
        {tabs.map((tab, index) => (
          <Tab
            label={<TabContent title={tab.title} />}
            key={tab.id}
            title={tab.title}
            index={index}
            className={classes.itemWrapper}
          />
        ))}
      </MaterialTabs>
    </>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden mdUp implementation="css">
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
          {getDrawer()}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {getDrawer()}
        </Drawer>
      </Hidden>
    </nav>
  );
}
