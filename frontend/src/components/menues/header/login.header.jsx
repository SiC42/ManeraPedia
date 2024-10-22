import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { authActions } from "ducks/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(0),
    padding: theme.spacing(0)
  }
}));

export default function LoginHeader(props) {
  const { handleClickOpenLogin } = props;
  const classes = useStyles();

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const username = useSelector(state =>
    state.auth.info ? state.auth.info.username : ""
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
    handleClose();
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {loggedIn ? (
        <>
          <Button
            className={classes.button}
            aria-label="account of current user"
            aria-controls="menu-login"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            endIcon={<AccountCircle />}
          >
            {username}
          </Button>
          <Menu
            id="menu-login"
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Button color="inherit" onClick={handleClickOpenLogin}>
          Login
        </Button>
      )}
    </>
  );
}
