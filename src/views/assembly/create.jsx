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
import MultipleValueTextInput from 'react-multivalue-text-input';
const CreateLoksaba = () => {
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
    lok_saba_id: '',
    district_id: '',
    places: []
  });

  const [loksaba, setLokSaba] = useState([]);
  const [district, setDistrict] = useState([]);
  const [lokId, setLokId] = useState('');
  const [districtId, setDistrictId] = useState('');
  //const [constituency,setConstituency] = useState([]);
  const [constituency, setConstituency] = useState([]);

  const fetchLokSaba = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'lokconstituency/fetch_all';
      const response = await axios.get(URL, { headers });
      setLokSaba(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDistrict = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'districts';
      const response = await axios.get(URL, { headers });
      setDistrict(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLokSabaChange = (e) => {
    var lokId = e.target.value;
    setLokId(lokId);
  };

  const handleDistrictChange = (e) => {
    var distId = e.target.value;
    setDistrictId(distId);
  };

  const renderLokSaba = () => {
    return loksaba?.map((lok, index) => (
      <option value={lok.id} key={lok.id}>
        {lok.name}
      </option>
    ));
  };

  const renderDistrict = () => {
    return district?.map((dist, index) => (
      <option value={dist.id} key={dist.id}>
        {dist.name}
      </option>
    ));
  };

  const handleMultiValueChange = (e) => {
    console.log(e.target.value);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
  };

  const handleSubmit = (e) => {
    //console.log(constituency);
    let newData = {
      lok_saba_id: lokId,
      district_id: districtId,
      places: constituency
    };
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'constituency/create';
    axios.post(URL, newData, { headers }).then((response) => {
      console.log(response);
      console.log(response.data.status, response.data.message);
      if (response.data.status == true) {
        setData({
          lok_saba_id: '',
          district_id: '',
          places: []
        });
        setConstituency([]);
        setDistrictId('');
        setLokId('');
        alert('Updated');
      } else {
        console.log('Some thing went wrong');
      }
    });
  };

  useEffect(() => {
    fetchLokSaba();
    fetchDistrict();
  }, []);

  return (
    <>
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Create Loksaba Constituency</Card.Title>
              </Card.Header>
              <Form onSubmit={handleSubmit}>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                        <Form.Label>District</Form.Label>
                        <Form.Control name="district" as="select" value={districtId} onChange={handleDistrictChange}>
                          <option value="">Select District</option>
                          {renderDistrict()}
                        </Form.Control>
                      </Form.Group>
                    </Col>
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
                  <Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                          <Form.Label>Enter the constituency</Form.Label>
                          <MultipleValueTextInput
                            onItemAdded={(item, allItems) => {
                              //setConstituency([...constituency, item])
                              const newObject = { name: item };
                              setConstituency([...constituency, newObject]);
                            }}
                            onItemDeleted={(item, allItems) => {
                              const newConstituency = constituency.filter((items) => items.name !== item);
                              console.log(newConstituency);
                              setConstituency(newConstituency);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Row>
                  <Row>
                    <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">
                      <Button type="button" className="text-capitalize btn btn-primary" onClick={handleSubmit}>
                        Upload
                      </Button>
                    </Form.Group>
                  </Row>
                </Card.Body>
              </Form>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </>
  );
};
export default CreateLoksaba;
