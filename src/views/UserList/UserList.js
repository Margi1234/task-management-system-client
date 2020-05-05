import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
// import Loader from 'react-loader-spinner';
import { UsersToolbar } from './components';
// import mockData from './data';
// import axios from 'axios';
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
class UserList extends Component {
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
  componentDidMount() {
    // axios
    //   .get(
    //     `http://localhost:5000/api/users/searchFilter/a${this.state.name}/a${this.state.email}/a${this.state.type}/a${this.state.status}`
    //   )
    //   .then((res) => {
    //     // console.log(res);
    //     this.setState({ users: res });
    //   });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <UsersToolbar />
        <div className={classes.content}>
          {/* <UsersTable users={users} filter={values} /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserList);

// const UserList = () => {
//   const classes = useStyles();
//   // const [load, setLoad] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [values, setValues] = useState({
//     name: '',
//     email: '',
//     type: '',
//     status: ''
//   });
//   useEffect(() => {
//     // setLoad(false);
//     // let email = values.email;
//     // let name = values.name;
//     // let type = values.type;
//     // let status = values.email;

//     axios
//       .get(
//         // `http://localhost:5000/api/users/searchFilter/a${name}/a${email}/a${type}/a${status}`
//         `http://localhost:5000/api/users/getAdminUserData`
//       )
//       .then((res) => {
//         console.log(res);
//         setUsers(res.data);
//         // setLoad(true);
//         // if (users) {
//         // }
//       })
//       .catch((err) => {
//         // setError(err.message);
//         // setLoad(true);
//       });
//   }, []);
//   // if (load) {
//   return (
//     <div className={classes.root}>
//       <UsersToolbar />
//       <div className={classes.content}>
//         <UsersTable users={users} filter={values} />
//       </div>
//     </div>
//   );
//   // } else {
//   //   return (
//   //     <div className={classes.root}>
//   //       <UsersToolbar />
//   //       <div className={classes.content}>
//   //         <Loader
//   //           className={classes.loader}
//   //           type="ThreeDots"
//   //           color="#0E4681"
//   //           height={80}
//   //           width={80}
//   //         />
//   //       </div>
//   //     </div>
//   //   );
//   // }
// };

// // export default UserList;
