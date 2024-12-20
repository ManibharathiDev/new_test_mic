import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link,useParams } from 'react-router-dom';
const EditCaste = () => {
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
        const [community,setCommunity] = useState([]);
        const [caste,setCaste] = useState([]);
        
        const [data, setData] = useState({
            community_id:"",
            name: "",
            status:"Active"
          });  

          const handleChange = (e) =>{
            const value = e.target.value
            setData({
              ...data,[e.target.name]:e.target.value
            })
        };

        const fetchCasteById = () => {
          try {
              const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"caste/show/"+id;
              axios.get(URL,{headers})
              .then(response =>{
                  console.log(response.data);
                  setData({
                    community_id:response.data.data[0].community_id,
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
                        community_id:data.community_id,
                        name: data.name,
                        status: "Active"
                    };
                    const headers = { 'Authorization': bearer };
                    let URL = window.API_URL+"caste/update/"+id;
                    axios.put(URL,userData,{headers})
                    .then((response)=>{
                      console.log(response);
                      console.log(response.data.status, response.data.message);
                        if(response.data.status == true)
                        {
                          setData({
                            community_id:"",
                            name: "",
                            status:""
                          });
                          window.location.replace("/admin/app/caste/view/");
                        }
                        else{
                            alert("Error");
                        }
                    });   
                } 
          
                const fetchCommunity = async () =>{
                    try {
                      const headers = { 'Authorization': bearer };
                      let URL = window.API_URL+"community/lists";
                      const response = await axios.get(URL,{ headers });
                      setCommunity(response.data.data);
                  } catch (error) {
                      console.log(error);
                  }
                  }
                  const renderCommunity = () =>{
                    return community?.map((dist,index) => (
                      <option value={dist.id} key={dist.id}>
                          {dist.name}
                      </option>
                  ))
                  }
                  useEffect(()=> {
                    fetchCommunity();
                    fetchCasteById(id)
                  }, [id]);

        return(
            <>
                <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Edit Community</Card.Title>
                </Card.Header>
                <Form >  
                <Card.Body>
                <Form>  
                    <Row>
                                             <Col md={6}>
                                                                   <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                                                                         <Form.Label>Community</Form.Label>
                                                                         <Form.Control name="community_id" as="select" value={data.community_id} onChange={handleChange}>
                                                                         <option value="">Select Community</option>
                                                                           {
                                                                             renderCommunity()
                                                                           }
                                                                         </Form.Control>
                                                                       </Form.Group>
                                                                   </Col>
                                                                 
                                               <Col md={6}>
                                               <Form.Group className="mb-3" controlId="formNameParty">
                                                   <Form.Label>Name of the Caste</Form.Label>
                                                   <Form.Control type="text" value={data.name} name='name' onChange={handleChange} placeholder="Enter the name of the Party" />
                                                   
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
export default EditCaste;