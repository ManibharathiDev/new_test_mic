import React, { useState } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  Form
} from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';

const CreatePayment = () => {
  let token = '';
  let bearer = '';

  if (secureLocalStorage.getItem('STATUS') != null) {
    const data = JSON.parse(secureLocalStorage.getItem('STATUS'));
    if (!data.status) {
      window.location.replace('/admin/login');
    }
    token = data.token;
    bearer = `Bearer ${token}`;
  } else {
    window.location.replace('/admin/login');
  }

  // Initialize state properly
  const [data, setData] = useState({
    first_amount: '',
    second_amount: '',
    status: ''
  });

  const [loading, setLoading] = useState(false); // New state for button disabling

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data || !bearer) {
      console.error("Missing required data or authorization token");
      return;
    }

    setLoading(true); // Disable submit button

    const userData = {
      first_amount: data.first_amount,
      second_amount: data.second_amount,
      status: 1 // Assuming status is set to 1 for active
    };

    const headers = { Authorization: bearer };
    let URL = `${window.API_URL}plan/create`;

    axios.post(URL, userData, { headers })
      .then((response) => {
        console.log(response);
        console.log(response.data.status, response.data.message);

        if (response.data.status === true) {
          setData({
            first_amount: '',
            second_amount: '',
            status: ''
          });
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
      })
      .finally(() => {
        setLoading(false); // Re-enable button after request completes
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create New Payment</Card.Title>
            </Card.Header>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Subscription Amount</Form.Label>
                      <Form.Control type="text" value={data.first_amount} name="first_amount" onChange={handleChange} placeholder="Enter First Amount" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Next Subscription Amount</Form.Label>
                      <Form.Control type="text" value={data.second_amount} name="second_amount" onChange={handleChange} placeholder="Enter Second Amount" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Button type="submit" className="text-capitalize btn btn-primary" disabled={loading}>
                      {loading ? "Processing..." : "Save"}
                    </Button>
                    <Button type="reset" className="text-capitalize btn btn-secondary" disabled={loading}>
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

export default CreatePayment;
