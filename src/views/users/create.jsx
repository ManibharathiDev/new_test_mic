//testing
import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';
const CreateUser = () =>{

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

  const [data, setData] = useState({
    usertype: "",
    partytype:"",
    party: "",
    name: "",
    email:"",
    usercode:"",
    mobile:"",
  });

  //const [userType,setUserType] = useState("");
  const [isPartyEnabled,setIsPartyEnabled] = useState(false);
  const [party,setParty] = useState(null);
  const partyProps = {};

  const handleChange = (e) =>{
    const value = e.target.value
    setData({
      ...data,[e.target.name]:e.target.value
    })
    if(e.target.name == "usertype")
    {
      if(e.target.value == "web_admin")
        {
          setIsPartyEnabled(true);
        }
      else
        {
          setIsPartyEnabled(false);
        }
    }
  
    console.log("Party is Selected",e.target.value);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        name: data.name,
        email: data.email,
        user_code:data.usercode,
        password:"123456",
        party:data.party,
        mobile:data.mobile,
        user_type:data.usertype,
        party_type:data.partytype
      };
      const headers = { 'Authorization': 'Bearer 25|iDa4bOxWyof9NCJiHoThrMDcLVwIgTi5b3Mk2Ixkeac05fb8' };
      let URL = window.API_URL+"auth/register";
      axios.post(URL,userData,{headers})
      .then((response)=>{
        console.log(response);
        console.log(response.data.status, response.data.message);
          if(response.data.status == true)
          {
            setData({
              usertype: "",
              partytype:"",
              party: "",
              name: "",
              email:"",
              usercode:"",
              mobile:"",
            });
          }
      });
  }

  const fetchParties = async () => {
    try {
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"party/fetch";
        const response = await axios.get(URL,{ headers });
        setParty(response.data.data);
    } catch (error) {
        setParty(null);
        console.log(error);
    }
  }

  const renderParties = () =>{
    return party?.map((data,index) => (
      <option value={data.id} key={data.id}>
          {data.name}
      </option>
  ))
  }

  useEffect(()=> {
    fetchParties();
    }, []);

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Create New User</Card.Title>
               
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
                             {
                                renderParties()
                             }
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
                                <Form.Control type="text" name="usercode" onChange={handleChange} value={data.usercode} placeholder="Enter the User Code" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formMobile">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" name="mobile" onChange={handleChange} value={data.mobile} placeholder="Enter the mobile number" />
                                
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
  };
export default CreateUser;