import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Loader from 'react-loader-spinner';
import { UsersToolbar } from './components';
// import mockData from './data';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
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
}));

const UserList = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({
    name: '',
    email: '',
    type: '',
    status: ''
  });
  useEffect(() => {
    setLoad(false);
    let email = values.email;
    let name = values.name;
    let type = values.type;
    let status = values.email;
    axios
      .get(
        `http://localhost:5000/api/users/searchFilter/a${name}/a${email}/a${type}/a${status}`
      )
      .then((res) => {
        console.log(res);
        setUsers(res.data);
        setLoad(true);
        if (users) {
        }
      })
      .catch((err) => {
        // setError(err.message);
        setLoad(true);
      });
  }, []);
  if (load) {
    return (
      <div className={classes.root}>
        <UsersToolbar />
        <div className={classes.content}>
          {/* <UsersTable users={users} /> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <UsersToolbar />
        <div className={classes.content}>
          <Loader
            className={classes.loader}
            type="ThreeDots"
            color="#0E4681"
            height={80}
            width={80}
          />
        </div>
      </div>
    );
  }
};

export default UserList;
