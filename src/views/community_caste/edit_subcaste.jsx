import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link,useParams } from 'react-router-dom';
const EditSubCaste = () => {
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
        const [communityId,setCommunityId] = useState("-1");
        const [subCaste,setSubCaste] = useState([]);
        
        const [data, setData] = useState({
            community_id:"",
            caste_id:"",
            name: "",
            status:"Active"
          });  

          const handleChange = (e) =>{
            const value = e.target.value
            setData({
              ...data,[e.target.name]:e.target.value
            })
        };

        const fetchSubCasteById = () => {
          try {
              const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"subcaste/show/"+id;
              axios.get(URL,{headers})
              .then(response =>{
                  console.log(response.data);
                  setData({
                    community_id:response.data.data[0].community_id,
                    caste_id:response.data.data[0].caste_id,
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
                        caste_id:data.caste_id,
                        name: data.name,
                        status: "Active"
                    };
                    const headers = { 'Authorization': bearer };
                    let URL = window.API_URL+"subcaste/update/"+id;
                    axios.put(URL,userData,{headers})
                    .then((response)=>{
                      console.log(response);
                      console.log(response.data.status, response.data.message);
                        if(response.data.status == true)
                        {
                          setData({
                            community_id:"",
                            caste_id:"",
                            name: "",
                            status:"Active"
                          });
                          window.location.replace("/admin/app/subcaste/view/");
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

                  const fetchCasteById = async (comId) =>{
                    try {
                      const headers = { 'Authorization': bearer };
                      let URL = window.API_URL+"caste/lists?community_id="+comId;
                      const response = await axios.get(URL,{ headers });
                      setCaste(response.data.data);
                      
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

                  const renderCaste = () =>{
                    return caste?.map((cast,index) => (
                      <option value={cast.id} key={cast.id}>
                          {cast.name}
                      </option>
                  ))
                  }

                  useEffect(()=> {
                    fetchCommunity();
                    if(data.community_id)
                        fetchCasteById(data.community_id)
                    fetchSubCasteById(id)
                  }, [data.community_id,id]);

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
                                                                         <Form.Control name="community_id" as="select" value={data.community_id} onChange={handleChange} disabled>
                                                                         <option value="">Select Community</option>
                                                                           {
                                                                             renderCommunity()
                                                                           }
                                                                         </Form.Control>
                                                                       </Form.Group>
                                                                   </Col>
                                                                 
                                                                   <Col md={6}>
                                                                   <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                                                                         <Form.Label>Caste</Form.Label>
                                                                         <Form.Control name="caste_id" as="select" value={data.caste_id} onChange={handleChange} disabled>
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
                                                                                                   <Form.Control type="text" value={data.name} name='name' onChange={handleChange} placeholder="Enter the name of the Subcaste" />
                                                                                                   
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
export default EditSubCaste;