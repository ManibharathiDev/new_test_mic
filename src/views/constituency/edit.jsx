import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link,useParams} from 'react-router-dom';
const EditConstituency = () =>{
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
    const [country,setCountry] = useState([]);  
    const [state,setState] = useState([]);
    const [data, setData] = useState({
        state_id: "",
        name:"",
      });
    const [countryId,setCountryId] = useState("");  
    const renderState = () =>{
        return state?.map((st,index) => (
          <option value={st.id} key={st.id}>
              {st.name}
          </option>
      ))
    }  
    const handleChange = (e) =>{
        const value = e.target.value
        if(e.target.name == "country_id")
        {
             setCountryId(e.target.value);   
        }
        else{
            setData({
            ...data,[e.target.name]:e.target.value
            })
         }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            country_code: data.country_code,
          name: data.name,
        };
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"country";
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

    const fetchStates = async (id) =>{
        try
        {
          const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"state/country/"+id;
          const response = await axios.get(URL,{ headers });
          console.log(response.data.result);
          setState(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }  

    const fetchCountry = async () =>{
        try 
        {
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

      const fetchParliamentsById = (id) =>{
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
    useEffect(()=> {
        fetchCountry();
        if(countryId)
            fetchStates(countryId); 
        fetchParliamentsById(id);
    }, [countryId,id]);
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Edit Parliament</Card.Title>
               
              </Card.Header>
                 <CardBody>
                 <Form onSubmit={handleSubmit}>  
                        <Row>
                            <Col md={4}>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                                                        <Form.Label>Country</Form.Label>
                                                        <Form.Control name="country_id" as="select" value={countryId} onChange={handleChange}>
                                                        <option value="">Select Country</option>
                                                          {
                                                            renderCountry()
                                                          }
                                                        </Form.Control>
                                                      </Form.Group>
                                                        </Col>
                            <Col md={4}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                                                        <Form.Label>State</Form.Label>
                                                        <Form.Control name="state_id" as="select" value={data.state_id} onChange={handleChange}>
                                                         <option value="">Select State</option>
                                                          {
                                                            renderState()
                                                          }
                                                        </Form.Control>
                                                      </Form.Group>
                            </Col>
                            <Col md={4}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Name of the Parliament</Form.Label>
                                <Form.Control type="text" value={data.name} name='name' onChange={handleChange} placeholder="Enter the name of the Parliament" />
                                
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
export default EditConstituency;