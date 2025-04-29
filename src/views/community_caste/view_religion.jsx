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
const ViewReligion = () => {
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

  const [religion, setReligion] = useState([]);
  const [page, setPage] = useState('1');

  const fetchReligion = async (page) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'religion/lists?pagination=1&page=' + page;
      const response = await axios.get(URL, { headers });
      setReligion(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const renderHeader = () => {
    let headerElement = ['#', 'Religion', 'action'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const deletes = (id, idx) => {
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'religion/delete/' + id;
    axios.delete(URL, { headers }).then((res) => {
      const data = religion.data.filter((item) => item.id != id);
      setReligion({ ...religion, data: data });
    });
  };

  const renderBody = () => {
    return religion.data?.map((data, index) => (
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>
          <Link to={`../app/religion/edit/${data.id}`} className="label theme-bg2 text-white f-12">
            <i className="feather icon-edit"></i> Edit
          </Link>
          <Link to="#" onClick={() => deletes(data.id, index)} className="label theme-bg text-c-red  f-12">
            <i className="feather icon-delete"></i> Delete
          </Link>
        </td>
      </tr>
    ));
  };

  const renderPaginationLinks = () => {
    return (
      <ul className="pagination">
        {religion.links?.map((link, index) => (
          <li key={index} className="page-item">
            <a style={{ cursor: 'pointer' }} className={`page-link ${link.active ? 'active' : ''}`} onClick={() => fetchNextPrev(link.url)}>
              {link.label.replace('&laquo;', '').replace('&raquo;', '')}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    if (page) fetchReligion();
  }, [page]);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Religion Details</Card.Title>
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
                  Showing {religion.from} to {religion.to} from {religion.total} results.
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
export default ViewReligion;
