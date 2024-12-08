import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link,useParams } from 'react-router-dom';
const EditWards = () => {
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
        const [district,setDistrict] = useState([]);
        const [districtId,setDistrictId] = useState("");
        const [types,setTypeId] = useState("");
        const type = [
            { id: "CORPORATION", name: 'CORPORATION' },
            { id: "MUNICIPAL", name: "MUNICIPAL" },
            { id: "TOWN PANJAYATH", name: "TOWN PANJAYATH" },
            { id: "PANJAYATH",name:"PANJAYATH"}
          ];
          const [data, setData] = useState({
            district_id: "",
            type:"",
            ename: "",
            tname: "",
            ward:"",
            status:"A"
          });  

          const handleChange = (e) =>{
            const value = e.target.value
            setData({
              ...data,[e.target.name]:e.target.value
            })
        };

        const fetchWardById = () => {
          try {
              const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"ward/show/"+id;
              axios.get(URL,{headers})
              .then(response =>{
                  console.log(response.data);
                  setData({
                     district_id: response.data.data[0].district_id,
                      type:response.data.data[0].type,
                      ename:response.data.data[0].name,
                      tname:response.data.data[0].tname,
                      ward:response.data.data[0].ward_number,
                      });
              })
              .catch(err => {
                  console.log(err)
              })
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


            const renderDistrict = () =>{
                return district?.map((dist,index) => (
                  <option value={dist.id} key={dist.id}>
                      {dist.name}
                  </option>
              ))
              }

              const renderType = () =>{
                return type?.map((data,index) => (
                  <option value={data.id} key={data.id}>
                      {data.name}
                  </option>
              ))
              }  

                const handleSubmit = (e) => {
                    e.preventDefault();
                    const userData = {
                        district_id: data.district_id,
                        type: data.type,
                      name:data.ename,
                      tname:data.tname,
                      ward_number:data.ward,
                      status:'A'
                    };
                    const headers = { 'Authorization': bearer };
                    let URL = window.API_URL+"ward/update/"+id;
                    axios.put(URL,userData,{headers})
                    .then((response)=>{
                      console.log(response);
                      console.log(response.data.status, response.data.message);
                        if(response.data.status == true)
                        {
                          setData({
                            district_id: "",
                            type:"",
                            ename: "",
                            tname: "",
                            ward:"",
                            status:"A"
                          });
                          window.location.replace("/admin/app/wards/view/");
                        }
                        else{
                            alert("Error");
                        }
                    });   
                } 
          
          useEffect(()=> {
            fetchDistrict();
            fetchWardById();
            }, []);

        return(
            <>
                <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Edit Ward</Card.Title>
                </Card.Header>
                <Form >  
                <Card.Body>
                <Form>  
                  <Row>
                    
                  <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>District</Form.Label>
                            <Form.Control name="district_id" as="select" value={data.district_id} onChange={handleChange}>
                            <option value="">Select District</option>
                              {
                                renderDistrict()
                              }
                            </Form.Control>
                          </Form.Group>
                      </Col>
                      <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Type</Form.Label>
                            <Form.Control name="type" as="select" value={data.type} onChange={handleChange}>
                            <option value="">Select Type</option>
                              {
                                renderType()
                              }
                            </Form.Control>
                          </Form.Group>
                            </Col>
                      
                  </Row>
                    <Row>

                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Name(In English)</Form.Label>
                                <Form.Control type="text" name='ename' value={data.ename} onChange={handleChange} placeholder="Enter the name in English" />
                                
                            </Form.Group>
                      </Col>
                      <Col md={6}>
                      <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Name(In Tamil)</Form.Label>
                                <Form.Control type="text" name='tname' value={data.tname} onChange={handleChange} placeholder="Enter the name in Tamil" />
                            </Form.Group>
                            </Col>

                    <Row>

                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Ward Number</Form.Label>
                                <Form.Control type="text" name='ward' value={data.ward} onChange={handleChange} placeholder="Enter the ward number" />
                                
                            </Form.Group>
                      </Col>
                        
                    </Row>            
                
                               
        
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
export default EditWards;