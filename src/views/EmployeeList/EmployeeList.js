import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { EmployeeToolbar } from './components';
const styles = (theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  loader: {
    display: 'flex',
    justifyContent: 'center'
  }
});
class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
      email: '',
      type: '',
      status: ''
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <EmployeeToolbar />
        <div className={classes.content}>
          {/* <UsersTable users={users} filter={values} /> */}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(EmployeeList);
