import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import * as XLSX from 'xlsx';
const VotersImport = () =>{
  let token = "";
  let bearer = ""
  if(secureLocalStorage.getItem("STATUS") != null)
    {
        const data = JSON.parse(secureLocalStorage.getItem("STATUS"));
        if(!data.status)
        {
          window.location.replace("/admin/login");
        }
        token = data.token;
        bearer = 'Bearer '+token;
    }
    else{
      window.location.replace("/admin/login");
    }
    const [loksaba, setLokSaba] = useState([]);
    const [constituency,setConstituency] = useState([]);
    const [data,setData] = useState(null);


    const fetchLokSaba = async () =>{
      try {
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"lokconstituency/fetch_all";
        const response = await axios.get(URL,{ headers });
        setLokSaba(response.data.result);
    } catch (error) {
        console.log(error);
    }
    }

    const handleLokSabaChange = (e) =>{
        var lokId = e.target.value;
        console.log("LOK Id",lokId);
        fetchConstitency(lokId)
    }

    const fetchConstitency = async (lokId) =>{
      try {
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"constituency/places/"+lokId;
        const response = await axios.get(URL,{ headers });
        setConstituency(response.data.result);
    } catch (error) {
        console.log(error);
    }
    }

    const handleUpload = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);
            console.log("Data",sheetData);
            setData(sheetData);
          };
      
          reader.readAsBinaryString(file);
    }

    const renderHeader = () => {
      let headerElement = ['#', 'EPIC Number', 'Name', 'Booth Number', 'Line Number','Gender','Age','Father Name','Husband Name']
    
      return headerElement.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
    }

    const renderBody = () => {
      return data?.map((user,index) => (
        <tr key={user.SL_NUMBER}>
             <td>{index+1}</td>
            <td>{user.EPIC_NUMBER}</td>
            <td>{user.VOTER_NAME}</td>
            <td>{user.BOOTH_NUMBER}</td>
            <td>{user.LINE_NUMBER}</td>
            <td>{user.GENDER}</td>
            <td>{user.AGE}</td>
            <td>{user.FATHER_NAME}</td>
            <td>{user.HUSBAND_NAME}</td>
        </tr>
    ))
    }

    const renderLokSaba = () =>{
      return loksaba?.map((lok,index) => (
        <option value={lok.id} key={lok.id}>
            {lok.name}
        </option>
    ))
    }

    const renderConstituency = () =>{
      return constituency?.map((cons,index) => (
        <option value={cons.id} key={cons.id}>
            {cons.name}
        </option>
    ))
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        LOK_SHABA_ID: 1,
        LEGISLATIVE_ID: 6,
        VOTERS:data
      };
      const headers = { 'Authorization': bearer };
      let URL = window.API_URL+"voters/import/create";
      //const headers = { 'Authorization': 'Bearer 25|iDa4bOxWyof9NCJiHoThrMDcLVwIgTi5b3Mk2Ixkeac05fb8' };
      axios.post(URL,userData,{headers})
      .then((response)=>{
        console.log(response);
        console.log(response.data.status, response.data.message);
          if(response.data.status == true)
          {
            setData(null)
          }
      });
  }

    useEffect(()=> {
      fetchLokSaba();
      }, []);


    return (
        <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Import Voters</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                      <Col md={6}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Constituency</Form.Label>
                            <Form.Control name="constituency" as="select" onChange={handleLokSabaChange}>
                             <option value="">Select Constituency</option>
                              {
                                renderLokSaba()
                              }
                            </Form.Control>
                          </Form.Group>
                      </Col>
                      <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Legislative Assembly</Form.Label>
                            <Form.Control name="legislative" as="select">
                             <option value="">Select Legislative Assembly</option>
                              {
                                renderConstituency()
                              }
                            </Form.Control>
                          </Form.Group>
                      </Col>
                  </Row>
                <Row>

                <Form className="d-inline-flex">
                    <Form.Group className="d-inline-flex align-items-center">
                      <Form.Label className="mb-0">Choose Voters Excel:</Form.Label>
                      <Form.Control className="mx-2" type='file' onChange={handleUpload} />
                    </Form.Group>
                    <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">
                    <Button type="button" className="text-capitalize btn btn-primary" onClick={handleSubmit}>Upload</Button>
                    </Form.Group>
                  </Form>      

                </Row>
                    <Table responsive className='my-5'>
                    <thead>
                      <tr>
                        {renderHeader()}
                      </tr>
                    </thead>
                    <tbody>
                    {
                                renderBody()
                              }     
                          </tbody>
                  </Table>                            
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      );
}
export default VotersImport;