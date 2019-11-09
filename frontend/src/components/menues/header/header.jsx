import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { tabActions } from "ducks/tabs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginDialog from "../login_dialog";
import LoginHeader from "./login.header";
import Search from "./search.header";

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));
let tabCount = 0;
const tab = () => {
  tabCount += 1;
  return {
    created: "2019-01-31T11:50:58",
    creator: "sascha",
    id: `Tevv7W0BbIDzQhiPeGZx${tabCount}`,
    modified: "2019-01-31T11:59:51",
    modifier: "SiC",
    tags: ["Journal", "[[Gruppe 1]]"],
    text:
      "* Sara, Helena und Kayne begraben Shank, sie wissen nicht wohin es als nächstes geht\n* Hassan stößt zufällig zu ihnen und legt Sara und Helena Taro Karten\n* Die Gruppe beschließt zu Rasten und sich danach auf den Weg zu den Orks zu machen\n* Hektor trifft auf die Gruppe, aber wird gerade von soldaten verfolgt\n* die helden schaffen es die Soldaten zu überwältigen\n*  Hektor und die gruppe lernen sich kennen, sie beschließen Gemeinsam zu den Zwergen zu reisen, weil ihre ziele überlappen\n* Bei der Rast auf dem Weg hat Helena einen Alptraum/Vision über die Verbrennung ihres Bruders\n* Kurz darauf erscheint eine seltsame gestalt und ein schwarzer Panther",
    title: `22.01.2019 - Ein neuer Gefährte für den weiten weiten Weg ${tabCount}`,
    type: "text/vnd.tiddlywiki"
  };
};

export default function Header(props) {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = React.useState(false);
  const { toggleDrawer } = props;

  const loggedIn = useSelector(state => state.auth.loggedIn);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  const dispatch = useDispatch();

  const addArticle = () => {
    dispatch(tabActions.add(tab()));
  };
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            ManeraPedia
          </Typography>
          <Search />
          <Button color="inherit" onClick={addArticle}>
            Add
          </Button>
          <LoginHeader handleClickOpenLogin={handleClickOpenLogin} />
          <LoginDialog
            open={openLogin && !loggedIn}
            handleClose={handleCloseLogin}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}
