import React, { Component } from "react";
import DataService from "../../Services/WebUserJobService";
import DataService1 from "../../Services/WebUserReviewService";
import '../../Css/JobDetail.css';
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from '../../images/button_save.svg';
import Card from '@material-ui/core/Card';
import { Container, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Fab } from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarRatingComponent from 'react-star-rating-component';



const useStyles = theme => ({
  header: {
    marginTop: theme.spacing(10),
    display: 'flex',
  },
  headerTable: {
    marginTop: theme.spacing(5),
    display: 'flex',
  },
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
    // boxShadow: '0 3px 5px 2px rgba(117, 119, 119, .3)',
  },
  cardMedia: {
    paddingTop: '20%', // 16:9

  },
  cardContent: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    marginBottom: theme.spacing(-3)
  },
  button: {
    marginLeft: theme.spacing(75),
    display: 'flex',
  },
  fab: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(101),
    display: 'flex',
  }
});



class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.addBookmark = this.addBookmark.bind(this);
    this.addViewJobEmail = this.addViewJobEmail.bind(this);
    this.addViewJobURL = this.addViewJobURL.bind(this);
    this.reviewListJCCatergory = this.reviewListJCCatergory.bind(this);

    this.state = {
      job: [],
      reviews: [],
      user: false,
    };


  }

  componentDidMount() {
    DataService.getJobDetail(this.props.match.params.id).then((res) => {
      this.setState({ job: res.data });
    }).catch(e => {
      console.log(e);
    });


    DataService1.getReviewByJobandCompany(this.props.match.params.id2, this.props.match.params.id3).then((res) => {
      this.setState({ reviews: res.data });
    }).catch(e => {
      console.log(e);
    });

    let status  = localStorage.getItem("user")
    this.setState( status===null ? {user:false}:{user:true});

  }

  addBookmark(id) {
    DataService.saveBookmarkJob(id).then(response => {
      console.log(response.data);
      this.props.history.push('AllBookmarkJobList')

      //window.location.reload();
    }).catch(e => { console.log(e); });
  }


  addViewJobEmail(id) {
    DataService.applyJobEmail(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('AllViewedJobsList')
        //window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  addViewJobURL(id) {

    DataService.applyJobURL(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('AllViewedJobsList')
        //window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  reviewListJCCatergory(jobtitle, companyname) {
    DataService1.getReviewByJobandCompany(jobtitle, companyname)
      .then(response => {
        console.log(response.data);
        this.props.history.push('ApprovedReviewList')
        //window.location.reload();

      })
      .catch(e => {
        console.log(e);
      });
  }

  bkalert() {
    alert("Bookmarked!");
  }

  render() {
    const { job } = this.state;
    const { reviews } = this.state;

    const { classes } = this.props;

    return (
      <div>
       
        <div className={classes.header}>

          <Container maxWidth="md">
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image="https://cdn.stocksnap.io/img-thumbs/960w/work-papers_FL8F0JKTMA.jpg"
                title="Image title"
              />
              {this.state.user?
              <Fab
                className={classes.fab}
                aria-label="bookmark"
                color="primary"
                onClick={(e) => this.addBookmark(job.jobid), this.bkalert}>
                <BookmarkRoundedIcon />
              </Fab>
              :""}
              <CardContent className={classes.cardContent}>

                <Typography gutterBottom variant="h5" component="h2">
                  {job.companyname} &nbsp;&nbsp;&nbsp;&nbsp; <StarRatingComponent
                    name="rate1"
                    editing={false}
                    renderStarIcon={() => <span>★</span>}
                    starCount={5}
                    value={job.companystarRating}
                  />
                </Typography>

                <Typography gutterBottom variant="h5" component="h2">
                  {job.jobTitle} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <StarRatingComponent
                    name="rate1"
                    editing={false}
                    renderStarIcon={() => <span>★</span>}
                    starCount={5}
                    value={job.jobStarRating}
                  />
                </Typography>
                <Divider />
                <br />
                <Typography gutterBottom variant="h6" component="h5">
                  Job Description: &nbsp;&nbsp; {job.jobDescription}
                </Typography>
                <Typography gutterBottom variant="h6" component="h5">
                  Job Qualification: &nbsp;&nbsp; {job.jobqualification}
                </Typography>
                <Typography gutterBottom variant="h6" component="h5">
                  Job Industry: &nbsp;&nbsp; {job.jobIndustry}
                </Typography>
                <Typography gutterBottom variant="h6" component="h5">
                  Autism Level: &nbsp;&nbsp; {job.autismLevel}
                </Typography>
              </CardContent>
              {this.state.user?
              <CardActions className={classes.button}>
                <Button size="large" color="primary" onClick={(e) => this.addViewJobEmail(job.jobid)}>
                  Apply By Email
                </Button>
                <Button size="large" color="primary" onClick={(e) => this.addViewJobURL(job.jobid)}>
                  <Link to={{ pathname: job.jobPositionURL }} target="_blank"> Apply By URL</Link>
                </Button>
              </CardActions>
              :""}
            </Card>
          </Container>
        </div>

        <div className={classes.headerTable}>
          <Container maxWidth="md">
            <Table stickyHeader className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell variant="head"><Typography variant="h6" color="primary">Review Stars</Typography></TableCell>
                  <TableCell align="right" variant="head"><Typography variant="h6" color="primary">Review Description&nbsp;</Typography></TableCell>
                  <TableCell align="right" variant="head"><Typography variant="h6" color="primary">Review Date&nbsp;</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell component="th" scope="row">
                      <Rating name="rate1" value={review.reviewstars} precision={0.1} readOnly />
                    </TableCell>
                    <TableCell align="right"><Typography variant="subtitle1">{review.reviewDescription}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="subtitle1">{review.reviewDate}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(JobDetail);
