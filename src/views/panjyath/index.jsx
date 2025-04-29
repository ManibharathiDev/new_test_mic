import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Table, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';
const Panjayaths = () => {
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

  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState('');
  const [panjyath, setPanjyath] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    const value = e.target.value;
    setDistrictId(value);
    setPage(1);
    //fetchWards(value);
  };

  const fetchWards = async (districtId, page) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'panjayath/lists?district_id=' + districtId + '&page=' + page;
      const response = await axios.get(URL, { headers });
      console.log('Result', response.data);
      setPanjyath(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDistrict = () => {
    return district?.map((dist, index) => (
      <option value={dist.id} key={dist.id}>
        {dist.name}
      </option>
    ));
  };

  const fetchDistrict = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'districts';
      const response = await axios.get(URL, { headers });
      setDistrict(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => {
    let headerElement = ['#', 'Name', 'District', 'action'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderPaginationLinks = () => {
    return (
      <ul className="pagination">
        {panjyath.links?.map((link, index) => (
          <li key={index} className="page-item">
            <a style={{ cursor: 'pointer' }} className={`page-link ${link.active ? 'active' : ''}`} onClick={() => fetchNextPrev(link.url)}>
              {link.label.replace('&laquo;', '').replace('&raquo;', '')}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const fetchNextPrev = (link) => {
    console.log('URL', link);
    const url = new URL(link);
    console.log('Parse ' + url);
    setPage(url.searchParams.get('page'));
  };

  const deletes = (id, idx) => {
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'panjayath/delete/' + id;
    axios.delete(URL, { headers }).then((res) => {
      const data = panjyath.data.filter((item) => item.id != id);
      setPanjyath({ ...panjyath, data: data });
    });
  };

  const renderBody = () => {
    return panjyath.data?.map((ward, index) => (
      <tr key={ward.id}>
        <td>{index + 1}</td>
        <td>{ward.name}</td>
        <td>{ward.district_data.name}</td>
        <td>
          <Link to={`../app/panjayath/edit/${ward.id}`} className="label theme-bg2 text-white f-12">
            <i className="feather icon-edit"></i> Edit
          </Link>
          <Link to="#" onClick={() => deletes(ward.id, index)} className="label theme-bg text-c-red  f-12">
            <i className="feather icon-delete"></i> Delete
          </Link>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    fetchDistrict();
    if (districtId) {
      fetchWards(districtId, page);
    }
  }, [districtId, page]);
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Panjayath Union Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                <Form.Label>District</Form.Label>
                <Form.Control name="district" as="select" value={districtId} onChange={handleChange}>
                  <option value="">Select District</option>
                  {renderDistrict()}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Table responsive>
            <thead>
              <tr>{renderHeader()}</tr>
            </thead>
            <tbody>{renderBody()}</tbody>
          </Table>
          <div className="my-4 d-flex justify-content-between">
            <div>
              Showing {panjyath.from} to {panjyath.to} from {panjyath.total} results.
            </div>
            <div>{renderPaginationLinks()}</div>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
export default Panjayaths;
