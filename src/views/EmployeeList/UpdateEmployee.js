import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Checkbox,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 3,
    overflow: 'visible'
  },
  alert: {
    marginBottom: '20px'
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // console.log('children ', children);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box div={2}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
const UpdateUser = (props) => {
  const { className, ...rest } = props;
  const { history } = props;
  const classes = useStyles();
  const [tabvalue, setTabValue] = useState(0);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  const [values, setValues] = useState({
    id: localStorage.getItem('updateId'),
    empid: localStorage.getItem('updateEmployeeId'),
    name: localStorage.getItem('updateEmployeeName'),
    email: localStorage.getItem('updateEmployeeEmail'),
    date: localStorage.getItem('updateEmployeedob'),
    gender: localStorage.getItem('updateEmployeeGender'),
    permanentaddress: localStorage.getItem('updateEmployeePermanentAddress'),
    currentaddress: localStorage.getItem('updateEmployeeCurrentAddress'),

    contact: localStorage.getItem('updateEmployeecontact'),
    officeemail: localStorage.getItem('updateEmployeeoffficeemail'),
    designation: localStorage.getItem('updateEmployeeDesignation'),
    joiningdate: localStorage.getItem('updateEmployeedoj'),
    skypeusername: localStorage.getItem('updateSkypeName'),
    office: localStorage.getItem('updateEmployeeofficeno')
  });
  const [success, successMessage] = useState(false);
  const handleBack = () => {
    history.goBack();
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleCheckbox = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log('in updating');
    console.log(values);
    axios
      .put('http://localhost:5000/api/users/updateEmployee', values)
      .then((res) => {
        if (res.status === 200) {
          successMessage(true);
          localStorage.removeItem('updateId');
          localStorage.removeItem('updateSkypeName');
          localStorage.removeItem('updateEmployeeId');
          localStorage.removeItem('updateEmployeeEmail');
          localStorage.removeItem('updateEmployeeName');
          localStorage.removeItem('updateEmployeeGender');
          localStorage.removeItem('updateEmployeedob');
          localStorage.removeItem('updateEmployeeoffficeemail');
          localStorage.removeItem('updateEmployeecontact');
          localStorage.removeItem('updateEmployeeofficeno');
          localStorage.removeItem('updateEmployeeDesignation');
          localStorage.removeItem('updateEmployeedoj');
          localStorage.removeItem('updateEmployeePermanentAddress');
          localStorage.removeItem('updateEmployeeCurrentAddress');
        }
        console.log(res);
      });
  };

  const gender = [
    {
      value: 'male',
      label: 'Male'
    },
    {
      value: 'female',
      label: 'Female'
    }
  ];
  const office = [
    {
      value: '304',
      label: '304'
    },
    {
      value: '403',
      label: '403'
    },
    {
      value: '302',
      label: '302'
    },
    {
      value: '301',
      label: '301'
    }
  ];
  const designation = [
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
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <AppBar position="static">
        <Tabs
          value={tabvalue}
          onChange={handleTabChange}
          aria-label="simple tabs example">
          <Tab label="Personal" {...a11yProps(0)} />
          <Tab label="Organization" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabvalue} index={0}>
        <form autoComplete="off">
          <CardHeader
            // subheader="Enter peronal details below"
            title="Enter personal details below"
          />
          <Divider />
          <CardContent>
            {/* {success ? (
              <Alert
                onClose={() => {
                  successMessage(false);
                }}
                className={classes.alert}>
                New Employee has been added successfully
              </Alert>
            ) : (
              ''
            )} */}
            <Grid container spacing={3}>
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  // helperText="Please specify the name"
                  label="Name"
                  margin="dense"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="dense"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  label="Date Of Birth"
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="dense"
                  name="date"
                  onChange={handleChange}
                  type="date"
                  value={values.date}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  label="Select Gender"
                  margin="dense"
                  name="gender"
                  onChange={handleChange}
                  required
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={values.gender}
                  variant="outlined">
                  {gender.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={7} xs={12}>
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
              <Grid item md={7} xs={12}>
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
              <Grid item md={7} xs={12}>
                <TextField
                  // fullWidth
                  label="Contact"
                  margin="dense"
                  name="contact"
                  type="tel"
                  maxLength="10"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  onChange={handleChange}
                  required
                  value={values.contact}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            {/* <Button color="primary" variant="contained" type="submit">
              Add Employee
            </Button> */}
            <Button color="primary" variant="outlined" onClick={handleBack}>
              Back
            </Button>
          </CardActions>
        </form>
      </TabPanel>
      <TabPanel value={tabvalue} index={1}>
        <form autoComplete="off" onSubmit={handleUpdate}>
          <CardHeader
            // subheader="Enter  details below"
            title="Add organization details below "
          />
          <Divider />
          <CardContent>
            {success ? (
              <Alert
                onClose={() => {
                  successMessage(false);
                }}
                className={classes.alert}>
                Employee has been updated successfully
              </Alert>
            ) : (
              ''
            )}
            <Grid container spacing={3}>
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  label="Office Email Address"
                  margin="dense"
                  name="officeemail"
                  type="email"
                  onChange={handleChange}
                  required
                  value={values.officeemail}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  label="Select Office"
                  margin="dense"
                  name="office"
                  onChange={handleChange}
                  required
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={values.office}
                  variant="outlined">
                  {office.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              {/* <Grid item md={7} xs={12}>
                <input type="checkbox" />
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  name="controlCheck">
                  <FormLabel component="legend">Reporting Person</FormLabel>
                  <FormGroup style={{ paddingLeft: '50px' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.reportingperson.hasmukhtank}
                          onChange={handleReportingPersonChange}
                          name="hasmukhtank"
                        />
                      }
                      label="Hasmukh Tank"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.reportingperson.kartikpatel}
                          onChange={handleReportingPersonChange}
                          name="kartikpatel"
                        />
                      }
                      label="Kartik Patel"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.reportingperson.vishalvaland}
                          onChange={handleReportingPersonChange}
                          name="vishalvaland"
                        />
                      }
                      label="Vishal Valand"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.reportingperson.hasmukhtank}
                          onChange={handleReportingPersonChange}
                          name="jayshah"
                        />
                      }
                      label="Jay Shah"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.reportingperson.hasmukhtank}
                          onChange={handleReportingPersonChange}
                          name="kevinmac"
                        />
                      }
                      label="Kevin Mac"
                    />
                  </FormGroup>
                </FormControl>
              </Grid> */}
              {/* <Grid item md={7} xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}>
                  <FormLabel component="legend">Department</FormLabel>
                  <FormGroup style={{ paddingLeft: '50px' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.department.accounting}
                          onChange={handleDepartmentChange}
                          name="accounting"
                        />
                      }
                      label="Accounting"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.department.development}
                          onChange={handleDepartmentChange}
                          name="development"
                        />
                      }
                      label="Development"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.department.design}
                          onChange={handleDepartmentChange}
                          name="design"
                        />
                      }
                      label="Design"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.department.qualityassurance}
                          onChange={handleDepartmentChange}
                          name="qualityassurance"
                        />
                      }
                      label="Quality Assurance"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.department.branding}
                          onChange={handleDepartmentChange}
                          name="branding"
                        />
                      }
                      label="Branding"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.department.sales}
                          onChange={handleDepartmentChange}
                          name="sales"
                        />
                      }
                      label="Sales"
                    />
                  </FormGroup>
                </FormControl>
              </Grid> */}
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  label="Select Designation"
                  margin="dense"
                  name="designation"
                  onChange={handleChange}
                  required
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
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  label="Joining Date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="dense"
                  name="joiningdate"
                  onChange={handleChange}
                  type="date"
                  value={values.joiningdate}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <TextField
                  fullWidth
                  label="Skype User Name"
                  margin="dense"
                  name="skypeusername"
                  type="text"
                  onChange={handleChange}
                  required
                  value={values.skypeusername}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color="primary" variant="contained" type="submit">
              SAVE Changes
            </Button>
            <Button color="primary" variant="outlined" onClick={handleBack}>
              Back
            </Button>
          </CardActions>
        </form>
      </TabPanel>
    </Card>
  );
};
UpdateUser.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default UpdateUser;
