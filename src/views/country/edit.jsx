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
const EditCountry = () => {
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
    country_code: '',
    name: ''
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const fetchCountryById = () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'country/' + id;
      axios
        .get(URL, { headers })
        .then((response) => {
          console.log(response.data);
          setData({
            country_code: response.data.data[0].country_code,
            name: response.data.data[0].name
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
      country_code: data.country_code,
      name: data.name
    };
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'country/' + id;
    axios.put(URL, userData, { headers }).then((response) => {
      console.log(response);
      console.log(response.data.status, response.data.message);
      if (response.data.status == true) {
        setData({
          country_code: '',
          name: ''
        });

        window.location.replace('/admin/app/country/view/');
      }
    });
  };

  useEffect(() => {
    fetchCountryById();
  }, [id]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Edit Country</Card.Title>
            </Card.Header>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formNameParty">
                      <Form.Label>Country Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={data.country_code}
                        name="country_code"
                        onChange={handleChange}
                        placeholder="Enter the Country Code"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter the Country Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Button type="submit" className="text-capitalize btn btn-primary">
                      Update
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
export default EditCountry;
