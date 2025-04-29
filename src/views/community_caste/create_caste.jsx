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
const CreateCaste = () => {
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
  const [data, setData] = useState({
    community_id: '',
    name: '',
    status: 'Active'
  });
  const [community, setCommunity] = useState([]);
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      community_id: data.community_id,
      name: data.name,
      status: 'Active'
    };
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'caste/create';
    axios.post(URL, userData, { headers }).then((response) => {
      console.log(response);
      console.log(response.data.status, response.data.message);
      if (response.data.status == true) {
        setData({
          community_id: '',
          name: '',
          status: 'Active'
        });
      }
    });
  };
  const fetchCommunity = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'community/lists';
      const response = await axios.get(URL, { headers });
      setCommunity(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const renderCommunity = () => {
    return community?.map((dist, index) => (
      <option value={dist.id} key={dist.id}>
        {dist.name}
      </option>
    ));
  };
  useEffect(() => {
    fetchCommunity();
  }, []);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create New Caste</Card.Title>
            </Card.Header>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label>Community</Form.Label>
                      <Form.Control name="community_id" as="select" value={data.community_id} onChange={handleChange}>
                        <option value="">Select Community</option>
                        {renderCommunity()}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formNameParty">
                      <Form.Label>Name of the Caste</Form.Label>
                      <Form.Control
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter the name of the Party"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Button type="submit" className="text-capitalize btn btn-primary">
                      Save
                    </Button>
                    <Button type="reset" className="text-capitalize btn btn-secondary">
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default CreateCaste;
