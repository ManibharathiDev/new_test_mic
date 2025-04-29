import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  Table,
  Tabs,
  Tab,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
  SplitButton,
  CardBody,
  Form
} from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';
const ViewCaste = () => {
  let token = '';
  let bearer = '';
  if (secureLocalStorage.getItem('STATUS') != null) {
    const data = JSON.parse(secureLocalStorage.getItem('STATUS'));
    if (!data.status) {
      window.location.replace('/admin/login');
    }
    token = data.token;
    bearer = 'Bearer ' + token;
  } else {
    window.location.replace('/admin/login');
  }

  const [caste, setCaste] = useState([]);
  const [page, setPage] = useState('1');

  const fetchCaste = async (page) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'caste/lists?page=' + page;
      const response = await axios.get(URL, { headers });
      setCaste(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const renderHeader = () => {
    let headerElement = ['#', 'Community', 'Caste', 'action'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const deletes = (id, idx) => {
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'caste/delete/' + id;
    axios.delete(URL, { headers }).then((res) => {
      const data = caste.data.filter((item) => item.id != id);
      setCaste({ ...caste, data: data });
    });
  };

  const renderBody = () => {
    return caste.data?.map((data, index) => (
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.community && data.community.name}</td>
        <td>{data.name}</td>
        <td>
          <Link to={`../app/caste/edit/${data.id}`} className="label theme-bg2 text-white f-12">
            <i className="feather icon-edit"></i> Edit
          </Link>
          <Link to="#" onClick={() => deletes(data.id, index)} className="label theme-bg text-c-red  f-12">
            <i className="feather icon-delete"></i> Delete
          </Link>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    if (page) fetchCaste(page);
  }, [page]);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Caste Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>{renderHeader()}</tr>
                </thead>
                <tbody>{renderBody()}</tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default ViewCaste;
