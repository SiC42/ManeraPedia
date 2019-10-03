import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Dialog } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function LoginDialog(props) {
  const {handleClose, open} = props
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CssBaseline/>
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => e.preventDefault()}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User Name"
            name="username"
            value={userName}
            onChange={e=> setUserName(e.target.value)}
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
            value={userPassword}
            onChange={e=> setUserPassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox 
              name="remember" 
              checked={rememberMe} 
              onChange={e=> setRememberMe(e.target.checked)}
              color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            LogIn
          </Button>
        </form>
      </div>
      </Container>
      </Dialog>
    </div>
  );
}
