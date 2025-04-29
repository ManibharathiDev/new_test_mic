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
const LokSabhaConstituency = () => {
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
  const [loksaba, setLokSaba] = useState([]);
  const [district, setDistrict] = useState([]);
  const [lokId, setLokId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [assembly, setAssembly] = useState([]);
  const handleLokSabaChange = (e) => {
    var lokId = e.target.value;
    setLokId(lokId);
    fetchAssembly(lokId);
  };

  const fetchAssembly = async (lokId) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'assembly/list?lok_saba_id=' + lokId;
      const response = await axios.get(URL, { headers });
      setAssembly(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConstituency = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'lokconstituency/fetch_all';
      const response = await axios.get(URL, { headers });
      setLokSaba(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderLokSaba = () => {
    return loksaba?.map((lok, index) => (
      <option value={lok.id} key={lok.id}>
        {lok.name}
      </option>
    ));
  };

  const renderHeader = () => {
    let headerElement = ['#', 'Assembly', 'Constituency', 'First Booth', 'Last Booth', 'action'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const deletes = (id, idx) => {
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'assembly/delete/' + id;
    axios.delete(URL, { headers }).then((res) => {
      const data = assembly.filter((item) => item.id != id);
      // setAssembly({ ...assembly, data: data })
      setAssembly(data);
    });
  };

  const renderBody = () => {
    return assembly?.map((data, index) => (
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.lok_saba_id}</td>
        <td>{data.first_booth}</td>
        <td>{data.last_booth}</td>
        <td>
          <Link to={`../app/assembly/edit/${data.id}`} className="label theme-bg2 text-white f-12">
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
    fetchConstituency();
    //fetchDistrict();
  }, []);
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Assembly</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            {/* <Col md={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                              <Form.Label>District</Form.Label>
                              <Form.Control name="district" as="select" value={districtId} onChange={handleDistrictChange}>
                              <option value="">Select District</option>
                                {
                                  renderDistrict()
                                }
                              </Form.Control>
                            </Form.Group>
                        </Col> */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                <Form.Label>Constituency</Form.Label>
                <Form.Control name="constituency" as="select" value={lokId} onChange={handleLokSabaChange}>
                  <option value="">Select Constituency</option>
                  {renderLokSaba()}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Assembly Details</Card.Title>
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
export default LokSabhaConstituency;
