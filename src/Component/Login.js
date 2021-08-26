import React, { Component } from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import Alert from '@material-ui/lab/Alert';
import MoodBadIcon from '@material-ui/icons/MoodBad';



import AuthService from "../_helpersvc/authservice";
import UserService from "../Services/UserService";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
});




class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      done: false,
      loginStatus:false,
    };

    


  }



  componentDidMount(){
    this.setState.done = false;
  }



  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
    
    const FormData = require('form-data');
    const form = new FormData();
    form.append('username', this.state.username);
    form.append('password', this.state.password)
    AuthService.login(form).then(response => {
      console.log(response.data);
      localStorage.setItem("user", response.data.access_token);
      localStorage.setItem("userRefreshToken", response.data.refresh_token);
      localStorage.setItem("roles", response.data.roles);
      localStorage.setItem("username", response.data.username);
      this.setState({ done: true });
      // this.props.history.push("/AllJobsList");
      
      UserService.getAvatarFiles(response.data.username).then(resp=>{
        localStorage.setItem("image",resp.data);
      }).catch(e => {
        console.log(e);
      });
      let timer = null;
      timer = setTimeout(()=>window.location.href = '/ApprovedApplicantList',1000);
    })
      .catch(e => {
        console.log(e);
        if(e.response.status===401 || e.response.status===403){
          this.setState({loginStatus:true});
      });

  }


  render() {
    const { classes } = this.props;

  

    return (
   
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        {this.state.loginStatus?<Alert severity="error">Something went wrong. Please try again <MoodBadIcon/></Alert>:null}
            <div className={classes.wrapper}>
              <Fab aria-label="save" color="primary">
              <Avatar className={classes.avatar} >{this.state.done ?   <CheckIcon  /> : <LockOutlinedIcon />}</Avatar >
              </Fab>
              {this.state.done && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          

          <form className={classes.form} noValidate
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {this.state.done?  `Success`:`Sign In` }
            </Button>
         
            <Link href="/CreateUser" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>

          </form>
        </div>
      </Container>

    );
  }

}

export default withStyles(useStyles,{withTheme:true})(Login);