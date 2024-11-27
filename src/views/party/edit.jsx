import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link,useParams } from 'react-router-dom';
const EditParties = () =>{
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
    const {id} = useParams();
    const [data, setData] = useState({
        name: "",
        description:"",
        leader: "",
        head_quarter: "",
        year_start:"",
        email:"",
        contact_person_1:"",
        contact_person_2:"",
        mobile_number:"",
        landline:""
      });
      const handleChange = (e) =>{
        const value = e.target.value
        setData({
          ...data,[e.target.name]:e.target.value
        })
    };


    const fetchPartyById = () => {
        try {
            const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"party/"+id;
            axios.get(URL,{headers})
            .then(response =>{
                console.log(response.data);
                setData({
                    name: response.data.data.name,
                    description:response.data.data.description,
                    leader: response.data.data.leader,
                    head_quarter:response.data.data.head_quarter,
                    year_start:response.data.data.year_of_start,
                    email:response.data.data.email,
                    contact_person_1:response.data.data.contact_person_1,
                    contact_person_2:response.data.data.contact_person_1,
                    mobile_number:response.data.data.mobile,
                    landline:response.data.data.landline,
                    });
            })
            .catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error);
        }
      }


    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
          name: data.name,
          description: data.description,
          head_quarter:data.head_quarter,
          leader:data.leader,
          mobile:data.mobile_number,
          landline:data.landline,
          email:data.email,
          year_of_start:data.year_start,
          contact_person_1:data.contact_person_1,
          contact_person_2:data.contact_person_1
        };
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"party/"+id;
        axios.put(URL,userData,{headers})
        .then((response)=>{
          console.log(response);
          console.log(response.data.status, response.data.message);
            if(response.data.status == true)
            {
              setData({
                name: "",
                description:"",
                leader: "",
                head_quarter: "",
                year_start:"",
                email:"",
                contact_person_1:"",
                contact_person_2:"",
                mobile_number:"",
                landline:""
              });
              
              window.location.replace("/admin/app/party/view/");
            }
        });
    }

    useEffect(()=> {
        fetchPartyById();
        }, [id]);

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Edit Party</Card.Title>
               
              </Card.Header>
                 <CardBody>
                 <Form onSubmit={handleSubmit}>  
                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Name of the Party</Form.Label>
                                <Form.Control type="text" value={data.name} name='name' onChange={handleChange} placeholder="Enter the name of the Party" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" value={data.description} name='description' onChange={handleChange}  placeholder="Enter the Description" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formLeder">
                                <Form.Label>Name of the Leader</Form.Label>
                                <Form.Control type="text" value={data.leader} name='leader' onChange={handleChange}  placeholder="Enter the name of the Leader" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Head Quarter</Form.Label>
                                <Form.Control type="text" value={data.head_quarter} name='head_quarter' onChange={handleChange}  placeholder="Enter the Head Quarter Name" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Year of Start</Form.Label>
                                <Form.Control type="number" name='year_start' value={data.year_start} onChange={handleChange}  placeholder="Enter the year of start" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={data.email} name='email' onChange={handleChange}  placeholder="Enter the Email Address" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Contact Person 1</Form.Label>
                                <Form.Control type="text" value={data.contact_person_1} name="contact_person_1" onChange={handleChange}  placeholder="First Contact Person Name" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Contact Person 2</Form.Label>
                                <Form.Control type="text" value={data.contact_person_2} name="contact_person_2" onChange={handleChange}  placeholder="Second Contact Person Name" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" value={data.mobile_number} name="mobile_number" onChange={handleChange}  placeholder="Enter the official Mobile Number" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Landline(If available)</Form.Label>
                                <Form.Control type="text" value={data.landline} name="landline" onChange={handleChange}  placeholder="Enter the Landline Number" />
            
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Button type="submit" className="text-capitalize btn btn-primary">Update</Button>
                                
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
export default EditParties;