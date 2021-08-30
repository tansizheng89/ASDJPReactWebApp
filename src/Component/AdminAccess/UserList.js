import React, { Component } from "react";
import UserDataService from "../../Services/UserService";
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import BlockIcon from '@material-ui/icons/Block';
import { CardHeader, Divider, Fab } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';


const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 3px 5px 2px rgba(117, 119, 119, .3)'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',

  },
});

class UserList extends Component {
  constructor(props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.removeUser = this.removeUser.bind(this);


    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }


  retrieveUsers() {
    UserDataService.getUsers()
      .then(response => {

        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        if (e.response.status === 403) {
          UserDataService.getUserUseRefreshToken();
            // this.refreshList();
        }
        console.log(e);
       window.location.href='/Login';
      });
  }


  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeUser(id) {
    UserDataService.deleteUser(id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
        this.refreshList();
      });

  }


  render() {
    const { users, currentIndex } = this.state;
    const { classes } = this.props;

    return (
      <div>

        <Container className={classes.cardGrid} maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
          <Typography variant="h3">All Applicants&nbsp;&nbsp;<AccountCircleRoundedIcon/></Typography>
        <br/>
            <Grid container spacing={4}>
              {users.map(((user) => (
                <Grid item key={(user.id)} xs={12} sm={6} md={4}>
                  <Card className={classes.card} variant="outlined">
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6">
                        <div>Name: &nbsp;{user.firstName} {user.lastName}</div>
                        <Divider/>
                        <div>Role:&nbsp;&nbsp;&nbsp;&nbsp;{user.roles}</div>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => this.removeUser(user.id)}>
                      <Chip label="Delete"color ="secondary" ></Chip>
                      </Button>
                      <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={this.state.open}
                        message="You have successfully reject review"
                      />
                    </CardActions>
                  </Card>
                </Grid>
              )))}
            </Grid>
          </div>
        </Container>
        
      </div>
    );
  }
}
export default withStyles(useStyles, { withTheme: true })(UserList);