import React, { Component } from "react";
import DataService from "../../Services/WebUserJobService";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Fab } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = theme => ({
  header:{
    marginTop: theme.spacing(15),
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(0),
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

class AllViewedJobList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        jobs: []
      };
    }

  componentDidMount() {
    DataService.getViewedJobsList().then((res) =>{
      this.setState({jobs:res.data});
    }).catch(e => {
      if (e.response.status === 403) {
        DataService.getUserUseRefreshToken();
          };
      console.log(e);
      window.location.reload();
    });
  }

  render(){
    const{jobs} = this.state;
    const { classes } = this.props;

    return(
      <div>
      <div className={classes.header}>

      <Container maxWidth="lg">
        <Typography variant="h3">Viewed Jobs&nbsp;&nbsp;<VisibilityIcon/></Typography>
        </Container>
        </div>

      <Container className={classes.cardGrid} maxWidth="md">
      <CssBaseline />
        <div className={classes.paper}>
          <Grid container spacing={4}>
            {this.state.jobs.map((job) => (
              <Grid item key={job.id} xs={12} sm={6} md={4}>
                <Card className={classes.card} variant="outlined">
                    <CardHeader

                    title={<Typography gutterBottom variant="h5" component="h2">
                      {job.companyname}
                      <div className="card_subtitle"><Link to={"/job/detail/" + job.jobid + "/" + job.jobTitle + "/" + job.companyname} target="_blank">{job.jobTitle}</Link></div>

                      <Box component="fieldset" mb={3} borderColor="transparent">
                           <Rating name="read-only" value={job.jobStarRating} precision={0.1} readOnly />
                       </Box>
                    </Typography>}/>

                    <CardContent className={classes.cardContent}>
                    <Typography>
                         <div>
                            <div className="field">Date Applied:</div>
                            <div className="card_info"> {job.dateViewed}</div>
                         </div>
                    </Typography>
                  </CardContent>

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

export default withStyles(useStyles,{withTheme:true})(AllViewedJobList);