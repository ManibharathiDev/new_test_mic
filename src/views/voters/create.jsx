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
const CreateVoters = () => {
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
  const [assembly, setAssembly] = useState([]);
  const [lokId, setLokId] = useState('');
  const [assemblyId, setAssemblyId] = useState('');
  const [rows, setRows] = useState([
    {
      id: 1,
      VOTER_NAME: '',
      EPIC_NUMBER: '',
      BOOTH_ADDRESS: '',
      BOOTH_NUMBER: '',
      LINE_NUMBER: '',
      FATHER_NAME: '',
      HUSBAND_NAME: '',
      GENDER: '',
      AGE: ''
    }
  ]);
  const renderLokSaba = () => {
    return loksaba?.map((lok, index) => (
      <option value={lok.id} key={lok.id}>
        {lok.name}
      </option>
    ));
  };

  const renderAssembly = () => {
    return assembly?.map((lok, index) => (
      <option value={lok.id} key={lok.id}>
        {lok.name}
      </option>
    ));
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        VOTER_NAME: '',
        EPIC_NUMBER: '',
        BOOTH_ADDRESS: '',
        BOOTH_NUMBER: '',
        LINE_NUMBER: '',
        FATHER_NAME: '',
        HUSBAND_NAME: '',
        GENDER: '',
        AGE: ''
      }
    ]);
  };

  const handleReset = () => {
    setRows([
      {
        id: 1,
        VOTER_NAME: '',
        EPIC_NUMBER: '',
        BOOTH_ADDRESS: '',
        BOOTH_NUMBER: '',
        LINE_NUMBER: '',
        FATHER_NAME: '',
        HUSBAND_NAME: '',
        GENDER: '',
        AGE: ''
      }
    ]);
  };

  const renderHeader = () => {
    let headerElement = [
      '#',
      'Voter Name',
      'EPIC Number',
      'Booth Address',
      'Booth Number',
      'Line Number',
      'Father Name',
      'Husband Name',
      'Gender',
      'Age',
      'Action'
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const handleLokSabaChange = (e) => {
    var lokId = e.target.value;
    setLokId(lokId);
  };

  const handleAssemblyChange = (e) => {
    var lokId = e.target.value;
    setAssemblyId(lokId);
  };

  const fetchLokSaba = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'lokconstituency/fetch_all';
      const response = await axios.get(URL, { headers });
      setLokSaba(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssembly = async (id) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'assembly/list?lok_saba_id=' + id;
      const response = await axios.get(URL, { headers });
      setAssembly(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      LOK_SHABA_ID: lokId,
      LEGISLATIVE_ID: assemblyId,
      VOTERS: rows
    };
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'voters/import/create';
    axios.post(URL, userData, { headers }).then((response) => {
      if (response.data.status == true) {
        alert('Voters Created Successfully');
        handleReset();
      } else {
        alert('Error');
      }
    });

    console.log('Assembly Data', assemblyData);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  useEffect(() => {
    fetchLokSaba();
    if (lokId) {
      fetchAssembly(lokId);
    }
  }, [lokId]);
  return (
    <>
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Create Voters</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                        <Form.Label>Parliament</Form.Label>
                        <Form.Control name="constituency" as="select" value={lokId} onChange={handleLokSabaChange}>
                          <option value="">Select Parliament</option>
                          {renderLokSaba()}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                        <Form.Label>Assembly</Form.Label>
                        <Form.Control name="assembly" as="select" value={assemblyId} onChange={handleAssemblyChange}>
                          <option value="">Select Assembly</option>
                          {renderAssembly()}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <button onClick={addRow}>Add Row</button>

                    <Table responsive>
                      <thead>
                        <tr>{renderHeader()}</tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                              <input type="text" name="VOTER_NAME" value={row.VOTER_NAME} onChange={(e) => handleInputChange(e, index)} />
                            </td>
                            <td>
                              <input type="text" name="EPIC_NUMBER" value={row.EPIC_NUMBER} onChange={(e) => handleInputChange(e, index)} />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="BOOTH_ADDRESS"
                                value={row.BOOTH_ADDRESS}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="BOOTH_NUMBER"
                                value={row.BOOTH_NUMBER}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            </td>

                            <td>
                              <input type="text" name="LINE_NUMBER" value={row.LINE_NUMBER} onChange={(e) => handleInputChange(e, index)} />
                            </td>

                            <td>
                              <input type="text" name="FATHER_NAME" value={row.FATHER_NAME} onChange={(e) => handleInputChange(e, index)} />
                            </td>

                            <td>
                              <input
                                type="text"
                                name="HUSBAND_NAME"
                                value={row.HUSBAND_NAME}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            </td>

                            <td>
                              <input type="text" name="GENDER" value={row.GENDER} onChange={(e) => handleInputChange(e, index)} />
                            </td>

                            <td>
                              <input type="text" name="AGE" value={row.AGE} onChange={(e) => handleInputChange(e, index)} />
                            </td>
                            <td>
                              <button onClick={() => handleDeleteRow(index)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </>
  );
};
export default CreateVoters;
