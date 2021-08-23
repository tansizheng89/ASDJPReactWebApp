import React, { Component } from "react";
import DataService from "../../Services/WebUserJobService";
import { Link } from "react-router-dom";


import { Container } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Fab } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import WorkIcon from '@material-ui/icons/Work';
import CategoryIcon from '@material-ui/icons/Category';

const useStyles = theme => ({
  header: {
    marginTop: theme.spacing(15),
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
    boxShadow: '0 3px 5px 2px rgba(117, 119, 119, .3)'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
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
  }
});

class JobCategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    DataService.getJobCategory().then((res) => {
      this.setState({ categories: res.data });
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    const { categories } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.header}>
          <Container maxWidth="lg">
            <Typography variant="h3">Jobs Category&nbsp;&nbsp;<CategoryIcon /></Typography>
            <br />
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Grid container spacing={4}>
              {Object.keys(this.state.categories).map((key, i) =>
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card className={classes.card} variant="outlined">
                    <CardHeader
                      title={<Typography gutterBottom variant="h5" component="h2">
                        <Link to={"/j/" + key}>{key}</Link>
                      </Typography>} />
                    <Divider />
                    <CardContent className={classes.cardContent}>
                      <Typography>
                        <div className="card_subtitle">Available Jobs: {this.state.categories[key]}</div>
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>
              )}
            </Grid>
          </div>
        </Container>
      </div>
    );

  }

}
export default withStyles(useStyles, { withTheme: true })(JobCategoryList);