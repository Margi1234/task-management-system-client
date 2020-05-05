import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
    // backgroundColor: theme.palette.primary
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  viewButton: {
    // margin: theme.spacing(2, 0),
    margin: '20px 0px 20px 20px',
    backgroundColor: '#0E4681',
    color: 'white',
    boxShadow: 'none'
    // '&:hover': {
    //   backgroundColor: 'white',
    //   color: '#0E4681',
    //   border: 'solid 1px #0E4681',
    //   boxShadow: 'none'
    // }
  },
  loa: {
    // maxWidth: '1200px',
    width: '1000px',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Budget = (props) => {
  const { className, ...rest } = props;
  const [totalUsers, getTotalUsers] = useState(0);
  const [load, setLoad] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/getAdminUserData')
      .then((res) => {
        // console.log(res.data.length);
        getTotalUsers(res.data.length);
        setLoad(true);
      })
      .catch((err) => {
        // setError(err.message);
        // setLoad(true)
      });
  }, []);
  if (load) {
    return (
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2">
                ADMIN
              </Typography>
              <Typography variant="h3">{totalUsers}</Typography>
            </Grid>
            <Grid item>
              <RouterLink to="/users">
                <Button
                  className={classes.viewButton}
                  color="primary"
                  variant="contained">
                  View More
                  <span className="MuiButton-endIcon MuiButton-iconSizeMedium">
                    <svg
                      className="MuiSvgIcon-root"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="presentation">
                      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
                    </svg>
                  </span>
                </Button>
              </RouterLink>
            </Grid>
          </Grid>
          {/* <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div> */}
        </CardContent>
      </Card>
    );
  } else {
    return (
      <div className={classes.loa}>
        <Loader
          // className={classes.loader}
          type="ThreeDots"
          color="#0E4681"
          height={80}
          width={80}
        />
      </div>
    );
  }
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
