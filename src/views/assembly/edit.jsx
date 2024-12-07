import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link,useParams } from 'react-router-dom';
const EditAssembly = () => {
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
        lok_saba_id: "",
        district_id:"",
        state_id:"",
        assembly:"",
        first_booth:"",
        last_booth:"",
        seq:"",
        status:"Active"
      });
      const handleChange = (e) =>{
        const value = e.target.value
        setData({
          ...data,[e.target.name]:e.target.value
        })

    };


    const fetchAssemblyById = () => {
        try {
            const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"assembly/show/"+id;
            axios.get(URL,{headers})
            .then(response =>{
                console.log(response.data);
                setData({
                    lok_saba_id: response.data.data[0].lok_saba_id,
                    district_id:response.data.data[0].district_id,
                    state_id:response.data.data[0].state_id,
                    assembly:response.data.data[0].name,
                    first_booth:response.data.data[0].first_booth,
                    last_booth:response.data.data[0].last_booth,
                    seq:response.data.data[0].seq,
                    status:response.data.data[0].status,
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
            lok_saba_id: data.lok_saba_id,
            district_id:data.district_id,
            state_id:data.state_id,
            name:data.assembly,
            first_booth:data.first_booth,
            last_booth:data.last_booth,
            seq:data.seq,
            status:'Active',
        };
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"assembly/update/"+id;
        axios.put(URL,userData,{headers})
        .then((response)=>{
          console.log(response);
          console.log(response.data.status, response.data.message);
            if(response.data.status == true)
            {
                setData({
                    lok_saba_id: "",
                    district_id:"",
                    state_id:"",
                    name:"",
                    first_booth:"",
                    last_booth:"",
                    seq:"",
                    status:"",
                    });
              
              window.location.replace("/admin/app/assembly/view/");
            }
        });
    }

    useEffect(()=> {
        fetchAssemblyById();
        }, [id]);
    return(
        <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Edit Assembly</Card.Title>
               
              </Card.Header>
                 <CardBody>
                 <Form onSubmit={handleSubmit}>  
                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Assembly</Form.Label>
                                <Form.Control type="text" value={data.assembly} name='assembly' onChange={handleChange} placeholder="Enter the Assembly Name" />
                                
                            </Form.Group>
                            </Col>

                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Constituency</Form.Label>
                                <Form.Control type="text" value={data.lok_saba_id} name='lok_saba_id' onChange={handleChange} placeholder="Enter the Constituency Name" disabled />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>First Booth</Form.Label>
                                <Form.Control type="text" value={data.first_booth} name='first_booth' onChange={handleChange} placeholder="Enter the Assembly Name" />
                                
                            </Form.Group>
                            </Col>

                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Last Booth</Form.Label>
                                <Form.Control type="text" value={data.last_booth} name='last_booth' onChange={handleChange} placeholder="Enter the Constituency Name" disabled />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Sequence</Form.Label>
                                <Form.Control type="text" value={data.seq} name='seq' onChange={handleChange} placeholder="Enter the Assembly Name" />
                                
                            </Form.Group>
                            </Col>

                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" value={data.status} name='status' onChange={handleChange} placeholder="Select Status"/>
                                
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
}
export default EditAssembly;