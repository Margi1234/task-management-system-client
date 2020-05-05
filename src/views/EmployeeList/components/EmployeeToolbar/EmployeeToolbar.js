import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Link } from 'react-router-dom';
// import { SearchInput } from 'components';
import FilterListIcon from '@material-ui/icons/FilterList';
import Drawer from '@material-ui/core/Drawer';
import EmployeeTable from '../EmployeeTable/EmployeeTable';
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

const EmployeeToolbar = (props) => {
  const { className, ...rest } = props;
  const anchor = 'right';
  const classes = useStyles();
  // const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [state, setState] = React.useState({
    right: false
  });

  const [values, setValues] = useState({
    empid: '',
    name: '',
    email: '',
    date: '',
    gender: '',
    permanentaddress: '',
    currentaddress: '',
    contact: '',
    officeemail: '',
    designation: '',
    joiningdate: '',
    skypeusername: '',
    office: ''
  });
  useEffect(() => {
    setValues((values) => ({ ...values }));
  }, [
    values.empid,
    values.name,
    values.email,
    values.gender,
    values.joiningdate,
    values.office,
    values.officeemail,
    values.permanentaddress,
    values.skypeusername,
    values.designation,
    values.currentaddress,
    values.contact,
    // values.department,
    // values.reportingperson,
    values.date
  ]);
  const handleChange = (event) => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const clearFilter = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      empid: '',
      name: '',
      email: '',
      date: '',
      gender: '',
      permanentaddress: '',
      currentaddress: '',
      contact: '',
      officeemail: '',
      designation: '',
      joiningdate: '',
      skypeusername: '',
      office: ''
    });
  };
  const designation = [
    {
      value: '',
      label: ''
    },
    {
      value: 'trainee',
      label: 'Trainee'
    },
    {
      value: 'associate team lead',
      label: 'Associate Team Lead'
    },
    {
      value: 'team lead',
      label: 'Team Lead'
    },
    {
      value: 'project manager',
      label: 'Project Manager'
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
                  label="Employee ID"
                  margin="dense"
                  name="empid"
                  onChange={handleChange}
                  value={values.empid}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  // helperText="Please specify the name"
                  label="Name"
                  margin="dense"
                  name="name"
                  onChange={handleChange}
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
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Office"
                  margin="dense"
                  name="office"
                  type="text"
                  onChange={handleChange}
                  value={values.office}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    fontFamily: 'arial'
                  }}
                  aria-label="minimum height"
                  rowsMin={5}
                  placeholder="Permanent Address"
                  name="permanentaddress"
                  id="permanentaddress"
                  value={values.permanentaddress}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    fontFamily: 'arial'
                  }}
                  aria-label="minimum height"
                  rowsMin={5}
                  placeholder="Current Address"
                  name="currentaddress"
                  id="currentaddress"
                  value={values.currentaddress}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  // fullWidth
                  label="Contact"
                  margin="dense"
                  name="contact"
                  type="tel"
                  maxLength="10"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  onChange={handleChange}
                  value={values.contact}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Select Designation"
                  margin="dense"
                  name="designation"
                  onChange={handleChange}
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={values.designation}
                  variant="outlined">
                  {designation.map((option) => (
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
        <Link to={'employees/add'}>
          <Button color="primary" variant="contained">
            Add Employee
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
      <EmployeeTable users={users} filter={values} />
    </div>
  );
};

EmployeeToolbar.propTypes = {
  className: PropTypes.string
};

export default EmployeeToolbar;
