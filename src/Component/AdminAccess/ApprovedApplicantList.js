import React, { Component } from "react";
import DataService from "../../Services/WebAdminService";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { CardHeader, Fab } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

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
  reviewDisplay:{
    display: 'flex'
  },
  reviewDescription:{
    marginBottom: theme.spacing(1),
    marginLeft:theme.spacing(2),
    display: 'flex'
  },
  spacingTop:{
    marginTop: theme.spacing(2),
    fontStyle: "italic",
  }
});


class ApprovedApplicantList extends Component {
    constructor(props) {
      super(props);
      this.rejectApplicant = this.rejectApplicant.bind(this);
      
      this.state = {
        applicants: [],
        open:false
      };
    }

  componentDidMount() {
    DataService.getApprovedApplicants().then((res) =>{
      this.setState({applicants:res.data});
      this.setState({open:false})
    }).catch(e => {
      if (e.response.status === 403) {
        DataService.getUserUseRefreshToken();
          };
      console.log(e);
      window.location.href='/Login';
    });
  }

  rejectApplicant(id){

    DataService.updateApplicant(
      id,"Blocked"            
  )
      .then(response => {
          console.log(response.data);
          this.setState({open:true})
          //this.props.history.push('ApprovedReviewList')
          window.location.reload();
          
      })
      .catch(e => {
          console.log(e);
      });
  }

  render(){
    const{reviews} = this.state;
    const { classes } = this.props;
    return(
      <div>

      <Container className={classes.cardGrid} maxWidth="md">
      <CssBaseline />
        <div className={classes.paper}>
        <Typography variant="h3">Approved Applicant&nbsp;&nbsp;<CheckCircleRoundedIcon/></Typography>
        <br/>
          <Grid container spacing={4}>
            {this.state.applicants.map((user) => (
              <Grid item key={user.id} xs={12} sm={6} md={4}>
                <Card className={classes.card} variant="outlined">
                    <CardHeader
                    title={<Typography gutterBottom variant="h5" component="h2">
                      {user.firstName} {user.lastName}
                    </Typography>}/>
                    <CardContent className={classes.cardContent}>
                    <Typography>
                    {user.reviews.map(r =>
                    <div key = {r.id}>
                      <div className={classes.spacingTop} >Review Description:</div>
                       <div>  {r.reviewDescription}</div>
                       <Divider/>
                      </div>)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick = {(e)=>this.rejectApplicant(user.id)}>
                    <Chip label="Block"color ="secondary" ></Chip>
                    </Button>
                    
                    <Snackbar
                      anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
                      open={this.state.open}
                      message="You have successfully blocked" 
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          </div>
        </Container>
        
  
      </div>
    );
  
  }

}
export default withStyles(useStyles,{withTheme:true})(ApprovedApplicantList);
