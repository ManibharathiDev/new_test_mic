import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';
const Wards = () =>{
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
    
    const [district,setDistrict] = useState([]);
    const [lokId,setLokId] = useState("");
    const [districtId,setDistrictId] = useState("");
    const [assembly,setAssembly] = useState([]);
    const [wards,setWards] = useState([]);
 
    const handleChange = (e) =>{
        const value = e.target.value
        setDistrictId(value);
        fetchWards(value);
    }

    const fetchWards = async(distId) =>{
       
        try {
            const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"ward/getall?district_id="+distId;
            const response = await axios.get(URL,{ headers });
            console.log("Result",response.data.data);
            setWards(response.data.data);
        } catch (error) {
            console.log(error);
        }
      }
  

    const renderDistrict = () =>{
      return district?.map((dist,index) => (
        <option value={dist.id} key={dist.id}>
            {dist.name}
        </option>
    ))
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

   

    const renderHeader = () => {
      let headerElement = ['#', 'Name','District','Type', 'Ward Number','action']
    
      return headerElement.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
    }

    const renderBody = () => {
        return wards?.map((ward,index) => (
          <tr key={ward.id}>
               <td>{index+1}</td>
              <td>{ward.name}</td>
              <td>{ward.district_id_name}</td>
              <td>{ward.type}</td>
              <td>{ward.ward_number}</td>
              <td>
              <Link to={`../app/wards/edit/${ward.id}`} className="label theme-bg2 text-white f-12">
              <i className='feather icon-edit'></i> Edit
              </Link>
               
              </td>
          </tr>
      ))
      }


  useEffect(()=> {
    fetchDistrict();
    }, []);
    return (
      <React.Fragment>
         <Card>
                <Card.Header>
                  <Card.Title as="h5">Ward Details</Card.Title>
                </Card.Header>
                <Card.Body>
                <Row>
                    
                   
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                              <Form.Label>District</Form.Label>
                              <Form.Control name="district" as="select" value={districtId} onChange={handleChange}>
                               <option value="">Select District</option>
                                {
                                  renderDistrict()
                                }
                              </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                 



        
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
              
      </React.Fragment>
    );
  };
export default Wards;