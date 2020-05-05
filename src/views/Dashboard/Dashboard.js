import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalEmployees
  // TasksProgress,
  // TotalProfit,
  // LatestSales,
  // UsersByDevice,
  // LatestProducts
  // LatestOrders
} from './components';
import auth from '../../common/auth';
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Dashboard extends Component {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.history.push('/dashboard');
    } else {
      this.props.history.push('/sign-in');
    }
  }
  s;
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item>
            <Budget />
          </Grid>

          <Grid item>
            <TotalEmployees />
          </Grid>
          {/*  <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestSales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <UsersByDevice />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
