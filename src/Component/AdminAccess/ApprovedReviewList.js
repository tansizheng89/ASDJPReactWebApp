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
import Snackbar from '@material-ui/core/Snackbar';
import Rating from '@material-ui/lab/Rating';
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
    marginTop: theme.spacing(1),
    display: 'flex'
  }
});

class ApprovedReviewList extends Component {
    constructor(props) {
      super(props);
      this.rejectReview = this.rejectReview.bind(this);
      
      this.state = {
        reviews: [],
        open:false
      };
    }

  componentDidMount() {
    DataService.getApprovedReviews().then((res) =>{
      this.setState({reviews:res.data});
      this.setState({open:false});
    }).catch(e => {
      if (e.response.status === 403) {
        DataService.getUserUseRefreshToken();
          };
      console.log(e);
      window.location.reload();
    });
  }

  rejectReview(id){

    DataService.updateReview(
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
    const { classes } = this.props;
    const{reviews} = this.state;
    return(
      <div>
        <Container className={classes.cardGrid} maxWidth="md">
      <CssBaseline />
        <div className={classes.paper}>
        <Typography variant="h3">Approved Reviews&nbsp;&nbsp;<CheckCircleRoundedIcon/></Typography>
        <br/>
          <Grid container spacing={4}>
            {this.state.reviews.map(((review ) => (
              <Grid item key={(review.id)} xs={12} sm={6} md={4}>
                <Card className={classes.card} variant="outlined">
                    <CardContent className={classes.cardContent}>
                    <Typography  variant="h6">
                    <div>Review ID: {review.id}</div>
                    </Typography>
                    <Divider />
                    <Rating name="read-only" value={review.reviewstars} precision={0.1} readOnly />
                    
                    <Typography variant="body2"> 
                  <div><Typography className={classes.reviewDisplay}>Description:</Typography> </div>
                  <div >&nbsp;&nbsp;&nbsp;&nbsp;{review.reviewDescription}</div>
                  <br></br>
                  <div><Typography className={classes.reviewDisplay}>Date: {review.reviewDate} </Typography></div>
                  <div><Typography className={classes.reviewDisplay}>Status: {review.reviewStatus} </Typography></div>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick = {(e)=>this.rejectReview(review.id)}>
                    <Chip label="Reject"color ="secondary" ></Chip>
                    </Button>
                    <Snackbar
                      anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
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

export default withStyles(useStyles,{withTheme:true})(ApprovedReviewList);
