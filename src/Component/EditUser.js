import React, { Component } from "react";
import UserDataService from "../Services/UserService";
import '../Css/EditUser.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import HowToRegOutlined from '@material-ui/icons/HowToRegOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert'
import { FormControl } from "@material-ui/core";


const useStyles = theme => ({
    paper: {
      marginTop: theme.spacing(10),
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    inputLabel: {
      margin: theme.spacing(36,1),
      marginLeft: theme.spacing(30),
    },
    
  });

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangefirstName = this.onChangefirstName.bind(this);
        this.onChangelastName = this.onChangelastName.bind(this);
        this.onChangeuserStatus = this.onChangeuserStatus.bind(this);
        this.onChangeemail=this.onChangeemail.bind(this);
        this.onChangecontactNumber=this.onChangecontactNumber.bind(this);
        this.onChangepassword=this.onChangepassword.bind(this);
        this.onChangeavatarImageUrl=this.onChangeavatarImageUrl.bind(this);
        this.onChangechatStatus=this.onChangechatStatus.bind(this);
        this.onChangedob=this.onChangedob.bind(this);
        this.onChangegender=this.onChangegender.bind(this);
        this.onChangeresume=this.onChangeresume.bind(this);
        this.onChangeselfIntro=this.onChangeselfIntro.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                firstName: "",
                lastName: "",
                username:"",
                contactNumber:"",
                
                chatStatus:"",
                dob:"",
                gender:"",
                
                selfIntro:"",
                userstatus: "",
            },
            message: "",
            avatarImageUrl:"",
            resume:"",
            done:false
        };
    }

    componentDidMount() {
        this.getUser(localStorage.getItem('username'));
    }

    onChangeId(e) {
        const id = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    id: id
                }
            };
        }); }
    onChangefirstName(e) {
        const firstName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    firstName: firstName
                }
            };
        });}
    onChangelastName(e) {
        const lastName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    lastName: lastName
                }
            };
        });}
    onChangeuserStatus(e) {
        const userstatus = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    userstatus: userstatus
                }
            };
        });}
    onChangeemail(e){
        const username = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    username: username
                }
            };
        });}
    onChangecontactNumber(e){
        const contactNumber = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    contactNumber: contactNumber
                }
            };
        });}
    onChangepassword(e){
        const password = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    password: password
                }
            };
        });}
    onChangeavatarImageUrl(e){
        this.setState({ avatarImageUrl : e.target.files});

        }
    onChangechatStatus(e){
        const chatStatus = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    chatStatus: chatStatus
                }
            };
        });}
    onChangedob(e){
        const dob = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    dob: dob
                }
            };
        });}
    onChangegender(e){
        const gender = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    gender: gender
                }
            };
        });}
    onChangeresume(e){
        this.setState({ resume: e.target.files });

        }
    onChangeselfIntro(e){
        const selfIntro = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    selfIntroduction: selfIntro
                }
            };
        });}

    getUser(id) {
        UserDataService.getUserById(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateUser() {

        var data = {
            firstName: this.state.currentUser.firstName,
            lastName: this.state.currentUser.lastName,
            username: this.state.currentUser.username,
            contactNumber: this.state.currentUser.contactNumber,
            password: this.state.currentUser.password,
            //avatarImageURl:this.state.avatarImageUrl[0],
            chatstatus: this.state.currentUser.chatStatus,
            dob: this.state.currentUser.dob,
            gender: this.state.currentUser.gender,
            //resumeURl:this.state.resume[0],
            selfIntroduction: this.state.currentUser.selfIntro,
            userStatus: this.state.currentUser.userStatus
          };

        let resumeURl = this.state.resume[0];

        UserDataService.updateUser(
            this.state.currentUser.id,
            data           
        )
            .then(response => {
                console.log(response.data);
                this.setState({done:true});
                UserDataService.uploadAvatar(this.state.currentUser.username, this.state.avatarImageUrl[0]).then(response => {
                    console.log(response.data);
          
                    UserDataService.uploadResume(this.state.currentUser.username, resumeURl).then(response => {
                      
                        console.log(response.data);
                      UserDataService.getAvatarFiles(this.state.currentUser.username).then(response => {
                        if (response.data !== null) {
                          localStorage.setItem("image", response.data);
                          // this.props.history.push("/Login");
                        }
                        console.log(response.data);
                      }).catch(e => {
                        console.log(e);
                      });
                    }).catch(e => {
                      console.log(e);
                    });
                  }).catch(e => {
                    console.log(e);
                  });
            })
            .catch(e => {
              if (e.response.status === 403) {
                UserDataService.getUserUseRefreshToken();
                  };
              console.log(e);
              window.location.reload();
            });
          }

    deleteUser() {
        UserDataService.deleteUser(this.state.currentUser.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/users')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentUser } = this.state;

        const { classes } = this.props;
        return (
          <Container maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>
            {this.state.done?<Alert severity="success">Profile Updated!</Alert>:null}
              <Avatar className={classes.avatar}>
                <HowToRegOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Your Profile
              </Typography>
              <FormControl variant="filled" className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={currentUser.firstName}
                      onChange={this.onChangefirstName}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={currentUser.lastName}
                      onChange={this.onChangelastName}
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={currentUser.username}
                      onChange={this.onChangeemail}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="contactNumber"
                      label="Contact Number"
                      name="contactNumber"
                      autoComplete="contactNumber"
                      value={currentUser.contactNumber}
                      onChange={this.onChangecontactNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Change Password"
                      type="password"
                      id="password"
                      value={currentUser.password}
                      onChange={this.onChangepassword}
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="date"
                      label="Birthday"
                      type="date"
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={currentUser.dob}
                      onChange={this.onChangedob}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>      
                  <InputLabel className={classes.inputLabel} id="demo-simple-select-filled-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="gender"
                      fullWidth
                      value={currentUser.gender}
                      onChange={this.onChangegender}
                    >
                      <MenuItem value="">
                      <em>Gender</em></MenuItem>
                      <MenuItem value={'Male'}>Male</MenuItem>
                      <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="selfIntro"
                      label="Self Introduction"
                      id="selfIntro"
                      value={currentUser.selfIntro}
                      onChange={this.onChangeselfIntro}
    
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="file"
                      name="avatarImage"
                      label="Upload Your Avatar Image Here"
                      id="avatarImage"
                      onChange={this.onChangeavatarImageUrl}  
                      InputLabelProps={{
                        shrink: true,
                      }}
    
                    />
                  </Grid>
    
                  <Grid item xs={12}>
                    
                    <TextField
                      variant="outlined"
                      fullWidth
                      type="file"
                      name="resume"
                      label="Upload Your Resume Here"
                      id="resume"
                      onChange={this.onChangeresume}
                      InputLabelProps={{
                        shrink: true,
                      }}
    
                    />
                  </Grid>
    
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.updateUser}
                  >
                    Update
                  </Button>

    
    
                </Grid>
              </FormControl>
            </div>
          </Container>
          
        );
    }
}

export default withStyles(useStyles)(EditUser);
