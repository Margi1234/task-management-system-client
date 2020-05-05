import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Grid, Typography, Button } from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
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
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  },
  viewButton: {
    margin: '20px 0px 20px 20px',
    backgroundColor: '#0E4681',
    color: 'white',
    boxShadow: 'none'
  }
}));

const TotalEmployees = (props) => {
  const { className, ...rest } = props;
  const [totalEmployees, getTotalEmployees] = useState(0);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/getEmployeeData')
      .then((res) => {
        getTotalEmployees(res.data.length);
      })
      .catch((err) => {});
  }, []);
  const classes = useStyles();

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
              EMPLOYEES
            </Typography>
            <Typography variant="h3">{totalEmployees}</Typography>
          </Grid>
          <Grid item>
            <RouterLink to="/employees">
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
      </CardContent>
    </Card>
  );
};

TotalEmployees.propTypes = {
  className: PropTypes.string
};

export default TotalEmployees;
