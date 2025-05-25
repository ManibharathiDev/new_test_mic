//testing
import React, { useEffect } from 'react';
import { useState } from 'react';
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
import { Link, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
const EditUser = () => {
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
    usertype: '',
    partytype: '',
    party: '',
    name: '',
    email: '',
    usercode: '',
    mobile: ''
  });
  const [isPartyEnabled, setIsPartyEnabled] = useState(false);
    const [party, setParty] = useState(null);
  const fetchUserById = async () => {
  try {
    const headers = { Authorization: bearer };
    const URL = `${window.API_URL}user/${id}`;

    const response = await axios.get(URL, { headers });
    const userData = response.data.data?.[0]; // Ensure data exists

    if (userData) {
      console.log("User Name", userData.name);
      console.log("User Email", userData.email);

      setData({
        usertype: userData.user_type === 'PARTY' ? 'party_user' : 'web_admin',
        partytype: userData.party_type ?? '',  // Ensures default values
        party: userData.party_id ?? '',
        name: userData.name ?? '',
        email: userData.email ?? '',
        usercode: userData.user_code ?? '',
        mobile: userData.mobile_number ?? ''
      });
    } else {
      console.warn('No user data found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

  const fetchParties = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'party/fetch';
      const response = await axios.get(URL, { headers });
      setParty(response.data.data);
    } catch (error) {
      setParty(null);
      console.log(error);
    }
  }; 

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    if (e.target.name == 'usertype') {
      if (e.target.value == 'web_admin') {
        setIsPartyEnabled(true);
      } else {
        setIsPartyEnabled(false);
      }
    }
    console.log('Party is Selected', e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      email: data.email,
      usertype: data.usertype,
      user_code: data.usercode,
      party: data.party,
      mobile: data.mobile
    };
    const headers = { Authorization: bearer };
    const URL = `${window.API_URL}user/update/${id}`;

    try {
      const response = await axios.put(URL, userData,{ headers });
      console.log(response);
      console.log(response.data.status, response.data.message);

      if (response.data.status) {
        setData({
          usertype: '',
          party: '',
          name: '',
          email: '',
          usercode: '',
          mobile: ''
        });
        navigate('/admin/app/users/view/');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
};

   const renderParties = () => {
    return party?.map((data, index) => (
      <option value={data.id} key={data.id}>
        {data.name}
      </option>
    ));
  };

  useEffect(() => {
    fetchUserById();
    fetchParties();
  }, [id]);

  return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Edit User</Card.Title>
              </Card.Header>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                        <Form.Label>User Type</Form.Label>
                        <Form.Control value={data.usertype} name="usertype" as="select" onChange={handleChange}>
                          <option value="">Select Type</option>
                          <option value="web_admin">Web Admin</option>
                          <option value="party_user">Party User</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
  
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                        <Form.Label>Party Type</Form.Label>
                        <Form.Control value={data.partytype} name="partytype" as="select" onChange={handleChange} disabled={isPartyEnabled}>
                          <option value="">Select Type</option>
                          <option value="ADMIN">Admin</option>
                          <option value="AGENT">Agent</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Party</Form.Label>
                        <Form.Control as="select" name="party" value={data.party} onChange={handleChange} disabled={isPartyEnabled}>
                          <option value="">Select Party</option>
                          {renderParties()}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={data.name} onChange={handleChange} placeholder="Enter the name" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formNameUser">
                        <Form.Label>Email ID (Login ID)</Form.Label>
                        <Form.Control type="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter the email ID" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formUserCode">
                        <Form.Label>User code</Form.Label>
                        <Form.Control
                          type="text"
                          name="usercode"
                          onChange={handleChange}
                          value={data.usercode}
                          placeholder="Enter the User Code" disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formMobile">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="mobile"
                          onChange={handleChange}
                          value={data.mobile}
                          placeholder="Enter the mobile number"
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
export default EditUser;
