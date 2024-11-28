import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';
const LokSabhaConstituency = () =>{
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
    const [district,setDistrict] = useState([]);
    const [lokId,setLokId] = useState("");
    const [districtId,setDistrictId] = useState("");
    const [constituency,setConstituency] = useState([]);
    const handleLokSabaChange = (e) =>{
      var lokId = e.target.value;
      setLokId(lokId);
      fetchLokConstituency(lokId);
      }

      const handleDistrictChange = (e) =>{
          var distId = e.target.value;
          setDistrictId(distId);
          }
    const fetchConstituency = async () =>{
      try {
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"lokconstituency/fetch_all";
        const response = await axios.get(URL,{ headers });
        setLokSaba(response.data.result);
    } catch (error) {
        console.log(error);
    }
    }

    const fetchDistrict = async () =>{
      try {
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"districts";
        const response = await axios.get(URL,{ headers });
        setDistrict(response.data.result);
    } catch (error) {
        console.log(error);
    }
    }

    const renderLokSaba = () =>{
      return loksaba?.map((lok,index) => (
        <option value={lok.id} key={lok.id}>
            {lok.name}
        </option>
    ))
    }

    const renderDistrict = () =>{
      return district?.map((dist,index) => (
        <option value={dist.id} key={dist.id}>
            {dist.name}
        </option>
    ))
    }

    const fetchLokConstituency = async (lokId) => {
      console.log("Bearer ",bearer);
      try {
          const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"constituency/"+districtId+"/"+lokId;
          const response = await axios.get(URL,{ headers });
          setConstituency(response.data.result);
      } catch (error) {
          console.log(error);
      }
    }

    const renderHeader = () => {
      let headerElement = ['#', 'Loksaba Constituency', 'Constituency', 'District','action']
    
      return headerElement.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
    }

    const deleteLoksaba = (id,idx)=>{
      const headers = { 'Authorization': bearer };
      let URL = window.API_URL+"constituency/delete/"+id;
      axios.delete(URL,{ headers })  
    .then(res => {  
      setConstituency((data) =>
        data.filter((item) => item.id !== id));
    })  
    }

    const renderBody = () => {
      return constituency?.map((data,index) => (
        <tr key={data.id}>
             <td>{index+1}</td>
            <td>{data.name}</td>
            <td>{data.const_name}</td>
            <td>{data.district_name}</td>
            <td><Link to="#" onClick={()=>deleteLoksaba(data.id,index)} className="label theme-bg text-c-red  f-12">
            <i className='feather icon-delete'></i> Delete
        </Link>
            </td>
        </tr>
    ))
    }

  useEffect(()=> {
    fetchConstituency();
    fetchDistrict();
    }, []);
    return (
      <React.Fragment>
         <Card>
                <Card.Header>
                  <Card.Title as="h5">Loksaba Constituency</Card.Title>
                </Card.Header>
                <Card.Body>
                <Row>
                    
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                              <Form.Label>District</Form.Label>
                              <Form.Control name="district" as="select" value={districtId} onChange={handleDistrictChange}>
                              <option value="">Select District</option>
                                {
                                  renderDistrict()
                                }
                              </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                              <Form.Label>Constituency</Form.Label>
                              <Form.Control name="constituency" as="select" value={lokId} onChange={handleLokSabaChange}>
                               <option value="">Select Constituency</option>
                                {
                                  renderLokSaba()
                                }
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
                <Card.Title as="h5">Loksaba Constituency Details</Card.Title>
              </Card.Header>
              <Card.Body>
              <Table responsive>
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
  };
export default LokSabhaConstituency;