import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
const Users = () => {
  let token = '';
  let bearer = '';
  if (secureLocalStorage.getItem('STATUS') != null) {
    console.log('Get');
    const data = JSON.parse(secureLocalStorage.getItem('STATUS'));
    if (!data.status) {
      window.location.replace('/admin/login');
    }
    token = data.token;
    bearer = 'Bearer ' + token;
  } else {
    window.location.replace('/admin/login');
  }

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const checkIfTaskIsDone = (done) =>
    done ? <span className="badge bg-success">Done</span> : <span className="badge bg-danger">Processing...</span>;

  const fetchNextPrevTasks = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  };

  const deleteUser = (id, idx) => {
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'user/delete/' + id;
    axios.delete(URL, { headers }).then((res) => {
      const data = users.data.filter((item) => item.id != id);
      setUsers({ ...users, data: data });
    });
  };

  const renderPaginationLinks = () => {
    return (
      <ul className="pagination">
        {users.links?.map((link, index) => (
          <li key={index} className="page-item">
            <a
              style={{ cursor: 'pointer' }}
              className={`page-link ${link.active ? 'active' : ''}`}
              onClick={() => fetchNextPrevTasks(link.url)}
            >
              {link.label.replace('&laquo;', '').replace('&raquo;', '')}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const renderHeader = () => {
    let headerElement = ['#', 'name', 'user code', 'party', 'mobile number','email', 'action'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return users.data?.map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.user_code}</td>
        <td>{user.party_id}</td>
        <td>{user.mobile_number}</td>
        <td>{user.email}</td>
        <td>
          <Link to="#" className="label theme-bg2 text-white f-12">
            <i className="feather icon-edit"></i> Edit
          </Link>
          <Link to="#" onClick={() => deleteUser(user.id, index)} className="label theme-bg text-c-red  f-12">
            <i className="feather icon-delete"></i> Delete
          </Link>
          
        </td>
      </tr>
    ));
  };


 const fetchUsers = async () => {
  try {
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'user?page=' + page;
    const response = await axios.get(URL, { headers });
    setUsers(response.data);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">User Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>{renderHeader()}</tr>
                </thead>
                <tbody>{renderBody()}</tbody>
              </Table>
              <div className="my-4 d-flex justify-content-between">
                <div>
                  Showing {users.from} to {users.to} from {users.total} results.
                </div>
                <div>{renderPaginationLinks()}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Users;
