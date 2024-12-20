import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link,useParams } from 'react-router-dom';
const EditReligion = () => {
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
        const [religion,setReligion] = useState([]);
        
        const [data, setData] = useState({
            name: "",
            status:"Active"
          });  

          const handleChange = (e) =>{
            const value = e.target.value
            setData({
              ...data,[e.target.name]:e.target.value
            })
        };

        const fetchReligionById = () => {
          try {
              const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"religion/show/"+id;
              axios.get(URL,{headers})
              .then(response =>{
                  console.log(response.data);
                  setData({
                    name: response.data.data[0].name
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
                        status: "Active"
                    };
                    const headers = { 'Authorization': bearer };
                    let URL = window.API_URL+"religion/update/"+id;
                    axios.put(URL,userData,{headers})
                    .then((response)=>{
                      console.log(response);
                      console.log(response.data.status, response.data.message);
                        if(response.data.status == true)
                        {
                          setData({
                            name: "",
                            status:""
                          });
                          window.location.replace("/admin/app/religion/view/");
                        }
                        else{
                            alert("Error");
                        }
                    });   
                } 
          
          useEffect(()=> {
            fetchReligionById();
            }, [id]);

        return(
            <>
                <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Edit Religion</Card.Title>
                </Card.Header>
                <Form >  
                <Card.Body>
                <Form>  
                    <Row>

                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' value={data.name} onChange={handleChange} placeholder="Enter the name in English" />
        
                            </Form.Group>
                      </Col>
                </Row>
                <Row>
                <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">
                <Button type="button" className="text-capitalize btn btn-primary" onClick={handleSubmit}>Update</Button>
                    </Form.Group>
                </Row>
                 </Form>                             
                </Card.Body>
                </Form>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
            </>
        );    

}
export default EditReligion;