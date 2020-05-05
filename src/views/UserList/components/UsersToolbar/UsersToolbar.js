import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { SearchInput } from 'components';
import FilterListIcon from '@material-ui/icons/FilterList';
import Drawer from '@material-ui/core/Drawer';
import UsersTable from '../UsersTable/UsersTable';
// import Button from '@material-ui/core/Button';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
// import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  userBtn: {
    margin: '10px'
  },
  closeBtn: {
    margin: '15px 0 10px 15px'
    // fontSize: '15px'
  }
}));

const UsersToolbar = (props) => {
  const { className, ...rest } = props;
  const anchor = 'right';
  const classes = useStyles();
  // const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [state, setState] = React.useState({
    right: false
  });

  const [values, setValues] = useState({
    name: '',
    email: '',
    type: '',
    status: ''
  });
  useEffect(() => {
    setValues((values) => ({ ...values }));
    // console.log('in userstoolbar', values);
    // axios
    //   .post(
    //     `http://localhost:5000/api/users/searchFilter/a${name}/a${email}/a${type}/a${status}`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setUsers(res.data);
    //     // setLoad(true);
    //   })
    //   .catch((err) => {
    //     // setError(err.message);
    //     // setLoad(true);
    //   });
    // setLoad(false);
  }, [values.name, values.email, values.type, values.status]);
  const handleChange = (event) => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const clearFilter = (event) => {
    event.preventDefault();
    setValues({ ...values, name: '', email: '', type: '', status: '' });
  };
  const status = [
    {
      value: '',
      label: ''
    },
    {
      value: 'active',
      label: 'Active'
    },
    {
      value: 'inactive',
      label: 'Inactive'
    }
  ];
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleFilter = (event) => {
    event.preventDefault();
  };
  const list = (anchor) => (
    <div className={clsx(classes.list)} role="presentation">
      <Card {...rest} className={clsx(classes.root, className)}>
        <form
          autoComplete="off"
          onSubmit={handleFilter}
          style={{ width: '315px' }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className={classes.closeBtn}>
            {/* <span style={{ fontSize: '20px' }}>&times; </span> */}
            &times; &nbsp; Close
          </Button>
          <CardHeader title="Filter" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  // helperText="Please specify the name"
                  label="Admin User Name"
                  margin="dense"
                  name="name"
                  onChange={handleChange}
                  // required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="dense"
                  name="email"
                  // type="email"
                  onChange={handleChange}
                  // required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Type"
                  margin="dense"
                  name="type"
                  onChange={handleChange}
                  type="text"
                  value={values.type}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Select Status"
                  margin="dense"
                  name="status"
                  onChange={handleChange}
                  // required
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={values.status}
                  variant="outlined">
                  {status.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={toggleDrawer(anchor, false)}
              type="submit"
              className={classes.closeBtn}>
              Apply Filter
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={(toggleDrawer(anchor, false), clearFilter)}
              // type="submit"
              className={classes.closeBtn}>
              Clear All
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
        <Link to={'users/add'}>
          <Button color="primary" variant="contained">
            Add user
          </Button>
        </Link>
        <div key={anchor}>
          <Button
            color="primary"
            variant="outlined"
            className={classes.userBtn}
            onClick={toggleDrawer(anchor, true)}>
            <FilterListIcon />
            Show Filters
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </div>
      </div>
      <span className={classes.spacer} />
      {/* {load } */}
      <UsersTable users={users} filter={values} />
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
