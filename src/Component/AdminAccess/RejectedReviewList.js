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
import Rating from '@material-ui/lab/Rating'
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';


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
 
class RejectedReviewList extends Component {
    constructor(props) {
      super(props);
      this.approveReview = this.approveReview.bind(this);
      
      this.state = {
        reviews: []
      };
    }

  componentDidMount() {
    DataService.getBlockedReviews().then((res) =>{
      this.setState({reviews:res.data});
    }).catch(e => {
      if (e.response.status === 403) {
        DataService.getUserUseRefreshToken();
          };
      console.log(e);
      window.location.href='/Login';
    });
  }

  approveReview(id){

    DataService.updateReview(
      id,"Approved"            
  )
      .then(response => {
          console.log(response.data);
          //this.props.history.push('RejectedReviewList')
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
        <Typography variant="h3">Rejected Reviews&nbsp;&nbsp;<BlockRoundedIcon/></Typography>
        <br/>
          <Grid container spacing={4}>
            {this.state.reviews.map(((review ) => (
              <Grid item key={(review.id)} xs={12} sm={6} md={4}>
                <Card className={classes.card} variant="outlined">
                    <CardContent className={classes.cardContent}>
                    <Rating name="read-only" value={review.reviewstars} precision={0.1} readOnly />
                    
                    <Typography variant="body1"> 
                  <div ><Typography className={classes.reviewDisplay} variant = "h6">Description:</Typography> </div>
                  <div >{review.reviewDescription}</div>
                  <div><Typography className={classes.reviewDisplay}>Date: {review.reviewDate} </Typography></div>
                  <div><Typography className={classes.reviewDisplay}>Status: {review.reviewStatus} </Typography></div>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick = {(e)=>this.approveReview(review.id)}>
                    <Chip label="Approve"color ="primary" ></Chip>
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
export default withStyles(useStyles,{withTheme:true})(RejectedReviewList);
