import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { tabOperations } from "ducks/tab";
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
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

const tab = {
  text:
    "Allgemeines:\n\n* [[Die Sprengung]]\n* [[Götter der Welt]]\n\nGruppe 1 (Dungeon World):\n\n* [[Übersicht über alle Artikel in Noranta|Noranta]]\n* [[Tagebücher der Gruppe 1]]\n\nGruppe 2 (Burning Wheel):\n\n* [[Allgemeine Übersicht über alle Burning Wheel Artikel|Burning Wheel]]\n* [[Geschichte von Drost und den Kolonien]]\n* [[Beispiel für Zuweisungen im Charakter Stats/Wounds|CharacterTemplate]]\n* [[Tagebücher der Gruppe 2]]",
  type: "text/vnd.tiddlywiki",
  title: "Übersicht für Manera",
  tags: ["overview"],
  modifier: "SiC",
  modified: "2019-01-31T12:07:52",
  creator: "SiC",
  created: "2018-11-06T11:55:13",
  access: {
    write: ["gm"],
    read: ["gm"]
  }
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
    dispatch(tabOperations.add(tab));
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
