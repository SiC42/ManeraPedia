import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import Search from "./search";
import LoginDialog from "./login_dialog"
import { Button } from "@material-ui/core";

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

export default function Header(props) {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = React.useState(false);
  const { toggleDrawer } = props;

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  return (
    <div>
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
          <Button color="inherit" onClick={handleClickOpenLogin}>Login</Button>
          <LoginDialog open={openLogin} handleClose={handleCloseLogin}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
