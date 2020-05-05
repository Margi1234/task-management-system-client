import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import useModal from './useModal';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Loader from 'react-loader-spinner';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  // Avatar,
  // Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  editBtn: {
    padding: '0',
    minWidth: '24px'
  },
  deleteBtn: {
    padding: '0',
    minWidth: '24px'
  },
  editIcon: {
    color: '#cecece',
    '&:hover': {
      color: 'black'
    }
  },
  deleteIcon: {
    color: '#cecece',
    '&:hover': {
      color: 'black'
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    width: '500%'
  }
}));

const headCells = [
  { id: 'empid', label: 'Employee ID' },
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'email',
    label: 'Email'
  },
  {
    id: 'gender',
    label: 'Gender'
  },
  {
    id: 'dob',
    label: 'Date of Birth'
  },
  {
    id: 'permanentaddress',
    label: 'Permanent Address'
  },
  {
    id: 'currentaddress',
    label: 'Current Address'
  },
  {
    id: 'contact',
    label: 'Contact'
  },
  {
    id: 'offficeemail',
    label: 'Office Email'
  },
  {
    id: 'officeno',
    label: 'Office No'
  },
  {
    id: 'reportingperson',
    label: 'Reporting Person'
  },
  {
    id: 'department',
    label: 'Department'
  },
  {
    id: 'designation',
    label: 'Designation'
  },
  {
    id: 'doj',
    label: 'Date of Joining'
  },
  {
    id: 'skypename',
    label: 'Skype Name'
  },
  {
    id: 'Actions',
    label: 'Actions'
  }
];
function EnhancedTableHead(props) {
  const {
    classes,
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
  // rowCount: PropTypes.number.isRequired
};

const EmployeeTable = (props) => {
  let { className, users, filter, ...rest } = props;
  const fil = filter;

  console.log('in user table users are', users);
  const { isShowing, toggle } = useModal();
  const classes = useStyles();
  const [load, setLoad] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  let [newUsers, setUsers] = useState(users);
  console.log('new user data', newUsers);
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoad(false);
    setUsers(users);
    var data = {
      ordBy: orderBy,
      ord: order,
      fil: fil,
      rows: rowsPerPage,
      page: page
    };
    axios
      .post('http://localhost:5000/api/users/sortEmployees', data)
      .then((res) => {
        setLoad(true);
        setUsers(res.data);
        console.log(newUsers);
        console.log('response is ', res.data);
      });
  }, [fil, rowsPerPage, page, order, orderBy]);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };
  const handleDelete = (id) => {
    var i = id;
    var userId = { id: i };
    console.log('userid', userId);
    axios
      .delete('http://localhost:5000/api/users/deleteEmployee', {
        data: userId
      })
      .then((res) => {
        var stat = res.status;
        if (stat === 200) {
          window.location.reload();
        }
        console.log(res.status);
      });
  };
  const handleEdit = (
    id,
    empid,
    name,
    email,
    gender,
    dob,
    permanentaddress,
    currentaddress,
    contact,
    offficeemail,
    officeno,
    reportingperson,
    department,
    designation,
    doj,
    skypename
  ) => {
    var userData = {
      id: id,
      empid: empid,
      name: name,
      email: email,
      gender: gender,
      dob: dob,
      permanentaddress: permanentaddress,
      currentaddress: currentaddress,
      contact: contact,
      offficeemail: offficeemail,
      officeno: officeno,
      // reportingperson : ,
      // department,
      designation: designation,
      doj: doj,
      skypename: skypename
    };
    localStorage.setItem('updateId', userData.id);
    localStorage.setItem('updateSkypeName', userData.skypename);
    localStorage.setItem('updateEmployeeId', userData.empid);
    localStorage.setItem('updateEmployeeEmail', userData.email);
    localStorage.setItem('updateEmployeeName', userData.name);
    localStorage.setItem('updateEmployeeGender', userData.gender);
    localStorage.setItem('updateEmployeedob', userData.dob);
    localStorage.setItem('updateEmployeeoffficeemail', userData.offficeemail);
    localStorage.setItem('updateEmployeecontact', userData.contact);
    localStorage.setItem('updateEmployeeofficeno', userData.officeno);
    localStorage.setItem('updateEmployeeDesignation', userData.designation);
    localStorage.setItem('updateEmployeedoj', userData.doj);
    localStorage.setItem(
      'updateEmployeePermanentAddress',
      userData.permanentaddress
    );
    localStorage.setItem(
      'updateEmployeeCurrentAddress',
      userData.currentaddress
    );
  };
  const handleRequestSort = (event, property) => {
    console.log('property is ', property);
    const isAsc = orderBy === property && order === 'asc';
    // var on = ordd.name;
    // setOrdd()
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    console.log('orderby', orderBy);
    console.log('order', order);

    var data = {
      ordBy: property,
      ord: order,
      fil: fil,
      rows: rowsPerPage,
      page: page
    };
    console.log(data);
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <EnhancedTableHead
                classes={classes}
                // numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                // rowCount={1}
              />
              {/* <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox"> */}
              {/* <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    /> */}
              {/* </TableCell> */}

              {/* </TableRow>
              </TableHead>  */}
              {load ? (
                <TableBody>
                  {newUsers.slice(0, rowsPerPage).map((user) => (
                    <TableRow className={classes.tableRow} hover key={user.id}>
                      {/* selected={selectedUsers.indexOf(user.id) !== -1}> */}
                      {/* <TableCell padding="checkbox">   
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell> */}
                      <TableCell>{user.empid}</TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          {/* <Avatar className={classes.avatar} src={user.avatarUrl}>
                          {getInitials(user.name)}
                        </Avatar> */}
                          <Typography variant="body1">{user.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.dob}</TableCell>
                      <TableCell>{user.permanentaddress}</TableCell>
                      <TableCell>{user.currentaddress}</TableCell>
                      <TableCell>{user.contact}</TableCell>
                      <TableCell>{user.offficeemail}</TableCell>
                      <TableCell>{user.officeno}</TableCell>
                      <TableCell>{user.reportingperson}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.designation}</TableCell>
                      <TableCell>{user.doj}</TableCell>
                      <TableCell>{user.skypename}</TableCell>
                      <TableCell>
                        <Link to={'employees/update'}>
                          <Button
                            onClick={() => {
                              handleEdit(
                                user.id,
                                user.empid,
                                user.name,
                                user.email,
                                user.gender,
                                user.dob,
                                user.permanentaddress,
                                user.currentaddress,
                                user.contact,
                                user.offficeemail,
                                user.officeno,
                                user.reportingperson,
                                user.department,
                                user.designation,
                                user.doj,
                                user.skypename
                              );
                            }}
                            className={classes.editBtn}>
                            <EditIcon className={classes.editIcon} />{' '}
                          </Button>
                        </Link>
                        <Button
                          onClick={() => {
                            handleDelete(user.id);
                          }}
                          className={classes.deleteBtn}>
                          <Modal isShowing={isShowing} hide={toggle} />
                          <DeleteIcon className={classes.deleteIcon} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <Loader
                  className={classes.loader}
                  type="ThreeDots"
                  color="#0E4681"
                  height={80}
                  width={80}
                />
              )}
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={10}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

EmployeeTable.propTypes = {
  className: PropTypes.string
  // users: PropTypes.array.isRequired
};

export default EmployeeTable;
