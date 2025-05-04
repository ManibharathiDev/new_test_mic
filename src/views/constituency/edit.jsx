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
const EditConstituency = () => {
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
  const [state, setState] = useState([]);
  const [data, setData] = useState({
    state_id: '',
    name: ''
  });
  const renderState = () => {
    return state?.map((st, index) => (
      <option value={st.id} key={st.id}>
        {st.name}
      </option>
    ));
  };
  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name == 'country_id') {
      setCountryId(e.target.value);
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      state_id: data.state_id,
      name: data.name
    };
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'lokconstituency/update/' + id;
    axios.put(URL, userData, { headers }).then((response) => {
      console.log(response);
      console.log(response.data.status, response.data.message);
      if (response.data.status == true) {
        setData({
          state_id: '',
          name: ''
        });
      }
    });
  };

  const fetchStates = async (id) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'state?country_id=' + id;
      const response = await axios.get(URL, { headers });
      console.log(response.data.result);
      setState(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };



  const fetchParliamentsById = (id) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'parliament/show/' + id;
      axios
        .get(URL, { headers })
        .then((response) => {
          if (response.data.status == true) {
          setData({
            state_id: response.data.data[0].state_data.id,
            name: response.data.data[0].name
          });
          window.location.replace('/admin/app/constituency/view/');
        }
        else{
          console.log('Transaction error');
        }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStates(1);
    fetchParliamentsById(id);
  }, [id]);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Edit Parliament</Card.Title>
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
                    <Form.Group className="mb-3" controlId="formNameParty">
                      <Form.Label>Name of the Parliament</Form.Label>
                      <Form.Control
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter the name of the Parliament"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Button type="submit" className="text-capitalize btn btn-primary">
                      Update
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
export default EditConstituency;
