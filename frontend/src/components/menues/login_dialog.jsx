import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Dialog } from "@material-ui/core";
import { loginActions } from "actions";
import { useDispatch, useSelector } from "react-redux";
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  }
}));
export default function LoginDialog(props) {
  const { handleClose, open } = props;
  const classes = useStyles();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const loggingIn = useSelector(state => state.login.loggingIn);

  const dispatch = useDispatch();
  const login = () => {
    dispatch(loginActions.login(username, password));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={e => e.preventDefault()}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="User Name"
                name="username"
                value={username}
                onChange={e => setUserName(e.target.value)}
                autoComplete="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <div className={classes.wrapper}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => login()}
                  disabled={loggingIn}
                >
                  Login
                </Button>
                {
                  loggingIn &&
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                }
              </div>
            </form>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
