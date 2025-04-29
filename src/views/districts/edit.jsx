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
import { Link, useParams } from 'react-router-dom';
const EditDistrict = () => {
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
  const { id } = useParams();
  const [data, setData] = useState({
    country_id: '',
    name: ''
  });
  const [state, setState] = useState([]);
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const fetchDistrictById = () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'districts/' + id;
      axios
        .get(URL, { headers })
        .then((response) => {
          console.log(response.data);
          setData({
            state_id: response.data.data.country_id,
            name: response.data.data.name
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      country_id: data.country_id,
      name: data.name
    };
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'districts/' + id;
    axios.put(URL, userData, { headers }).then((response) => {
      console.log(response);
      console.log(response.data.status, response.data.message);
      if (response.data.status == true) {
        setData({
          state_id: '',
          name: ''
        });
        window.location.replace('/admin/app/district/view/');
      } else {
        console.log('Transaction error');
      }
    });
  };
  useEffect(() => {
    fetchDistrictById();
    fetchStates();
  }, []);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create New State</Card.Title>
            </Card.Header>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label>State</Form.Label>
                      <Form.Control name="state_id" as="select" value={data.state_id} onChange={handleChange}>
                        <option value="">Select State</option>
                        {renderState()}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" value={data.name} name="name" onChange={handleChange} placeholder="Enter the State Name" />
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
export default EditDistrict;
