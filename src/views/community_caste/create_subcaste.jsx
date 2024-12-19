import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
const CreateSubCaste = () =>{
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
    const [caste,setCaste] = useState([]);
    const [data, setData] = useState({
        caste_id:"",
        name:"",
      });
      const handleChange = (e) =>{
        const value = e.target.value
        setData({
          ...data,[e.target.name]:e.target.value
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            country_code: data.country_code,
          name: data.name,
        };
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"caste";
        axios.post(URL,userData,{headers})
        .then((response)=>{
          console.log(response);
          console.log(response.data.status, response.data.message);
            if(response.data.status == true)
            {
              setData({
                country_code: "",
                name:""
              });
            }
        });
    }

    const fetchCaste = async () =>{
        try {
            const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"caste/fetch_all";
            const response = await axios.get(URL,{ headers });
            setCaste(response.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    const renderCaste = () =>{
        return caste?.map((cast,index) => (
          <option value={cast.id} key={cast.id}>
              {cast.name}
          </option>
      ))
      }

    useEffect(()=> {
        fetchCaste();
    }, []);

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Create New Subcaste</Card.Title>
               
              </Card.Header>
                 <CardBody>
                 <Form onSubmit={handleSubmit}>  
                        <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                                                        <Form.Label>Caste</Form.Label>
                                                        <Form.Control name="caste_id" as="select" value={data.caste_id} onChange={handleChange}>
                                                         <option value="">Select Caste</option>
                                                          {
                                                            renderCaste()
                                                          }
                                                        </Form.Control>
                                                      </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Name of the Subcaste</Form.Label>
                                <Form.Control type="text" value={data.name} name='name' onChange={handleChange} placeholder="Enter the name of the Party" />
                                
                            </Form.Group>
                            </Col>
                            
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Button type="submit" className="text-capitalize btn btn-primary">Save</Button>
                                <Button type="reset" className="text-capitalize btn btn-secondary">Clear</Button>
                            </Col>
                        </Row>


                    </Form>
                 </CardBody>   
            </Card>
            
            
          </Col>
        </Row>
      </React.Fragment>
    );
}
export default CreateSubCaste;