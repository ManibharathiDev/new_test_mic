import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link,useParams } from 'react-router-dom';
const EditState = () =>{
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
        country_id: "",
        name:"",
      });
      const [country,setCountry] = useState([]);  
      const handleChange = (e) =>{
        const value = e.target.value
        setData({
          ...data,[e.target.name]:e.target.value
        })
    };

    const fetchStateById = () => {
        try {
            const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"state/"+id;
            axios.get(URL,{headers})
            .then(response =>{
                console.log(response.data);
                setData({
                    country_id: response.data.data[0].country_data.id,
                    name:response.data.data[0].name
                    });
            })
            .catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error);
        }
      }

    const fetchCountry = async () =>{
        try {
          const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"country/get";
          const response = await axios.get(URL,{ headers });
          setCountry(response.data.data);
      } catch (error) {
          console.log(error);
      }
      }

      const renderCountry = () =>{
        return country?.map((cont,index) => (
          <option value={cont.id} key={cont.id}>
              {cont.name}
          </option>
      ))
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
          country_id: data.country_id,
          name: data.name,
        };
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"state/"+id;
        axios.put(URL,userData,{headers})
        .then((response)=>{
          console.log(response);
          console.log(response.data.status, response.data.message);
            if(response.data.status == true)
            {
              setData({
                country_id: "",
                name:""
              });
              window.location.replace("/admin/app/state/view/");
            }
            else{
                console.log("Transaction error");
            }
        });
    }
    useEffect(()=> {
        fetchStateById();
        fetchCountry();
        }, []);
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Create New State</Card.Title>
               
              </Card.Header>
                 <CardBody>
                 <Form onSubmit={handleSubmit}>  
                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Country</Form.Label>
                            <Form.Control name="country_id" as="select" value={data.country_id} onChange={handleChange}>
                            <option value="">Select Country</option>
                              {
                                renderCountry()
                              }
                            </Form.Control>
                          </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" value={data.name} name='name' onChange={handleChange}  placeholder="Enter the State Name" />
                                
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
export default EditState;