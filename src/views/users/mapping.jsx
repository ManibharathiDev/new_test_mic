import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
// import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const Mapping = () =>{
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
    const [loksaba, setLokSaba] = useState([]);
    const [constituency,setConstituency] = useState([]);
    const [party,setParty] = useState([]);
    const [users,setUsers] = useState([]);
    const [data,setData] = useState(null);
    const [selectedCons,setSelectedCons] = useState([]);

    const customStyles = {
        option: provided => ({
          ...provided,
          color: 'black'
        }),
        control: provided => ({
          ...provided,
          color: 'black'
        }),
        singleValue: provided => ({
          ...provided,
          color: 'black'
        })
      }


    const fetchLokSaba = async () =>{
        try {
          const headers = { 'Authorization': bearer };
          const response = await axios.get(`http://127.0.0.1:8000/api/lokconstituency/fetch_all`,{ headers });
          setLokSaba(response.data.result);
      } catch (error) {
          console.log(error);
      }
      }

      const fetchParties = async () => {
        try {
            const headers = { 'Authorization': bearer };
            const response = await axios.get(`http://127.0.0.1:8000/api/party/fetch`,{ headers });
            setParty(response.data.data);
        } catch (error) {
            setParty(null);
            console.log(error);
        }
      }

      const handlePartyChange = (e) =>{
        var partyId = e.target.value;
        fetchUsers(partyId);
      }
  
      const handleLokSabaChange = (e) =>{
          var lokId = e.target.value;
          console.log("LOK Id",lokId);
          fetchConstitency(lokId)
      }

      const fetchUsers = async(partyId) =>{
        try {
            const headers = { 'Authorization': bearer };
            const response = await axios.get(`http://127.0.0.1:8000/api/party/user/${partyId}`,{ headers });
            setUsers(response.data.data);
          } catch (error) {
              console.log(error);
          }
      }
  
      const fetchConstitency = async (lokId) =>{
        try {
          const headers = { 'Authorization': bearer };
          const response = await axios.get(`http://127.0.0.1:8000/api/constituency/places/${lokId}`,{ headers });
          setConstituency(response.data.result);
        } catch (error) {
            console.log(error);
        }
      }

      const renderUsers = () =>{
        return users?.map((user,index) => (
          <option value={user.id} key={user.id}>
              {user.name}
          </option>
      ))
      }

      const renderLokSaba = () =>{
        return loksaba?.map((lok,index) => (
          <option value={lok.id} key={lok.id}>
              {lok.name}
          </option>
      ))
      }

      const renderParties = () =>{
        return party?.map((lok,index) => (
          <option value={lok.id} key={lok.id}>
              {lok.name}
          </option>
      ))
      }
  
      const renderConstituency = () =>{
        return constituency?.map((cons,index) => (
          <option value={cons.id} key={cons.id}>
              {cons.name}
          </option>
      ))
      }

      const onSelect = (selectedList, selectedItem) =>{
            console.log("List",selectedList);
            console.log("Item",selectedItem);
      }

      const onRemove = (selectedList, selectedItem) =>{
        console.log("List",selectedList);
        console.log("Item",selectedItem);
      }

      const handleConsChange = (selectedCon)=>{
        setSelectedCons(selectedCon);
      }

    useEffect(()=> {
        fetchParties();
        fetchLokSaba();
        }, []);
    return(
        <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Assembly Mapping</Card.Title>
                </Card.Header>
                <Card.Body>
                <Row>
                      <Col md={6}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Party</Form.Label>
                            <Form.Control name="party" as="select" onChange={handlePartyChange}>
                             <option value="">Select Party</option>
                              {
                                renderParties()
                              }
                            </Form.Control>
                          </Form.Group>
                      </Col>
                      <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Users</Form.Label>

                            <Form.Control name="users" as="select">
                             <option value="">Select Party Users</option>
                              {
                                renderUsers()
                              }
                            </Form.Control>
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col md={6}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Constituency</Form.Label>
                            <Form.Control name="constituency" as="select" onChange={handleLokSabaChange}>
                             <option value="">Select Constituency</option>
                              {
                                renderLokSaba()
                              }
                            </Form.Control>
                          </Form.Group>
                      </Col>
                      <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Legislative Assembly</Form.Label>
                            <Select
                                options={constituency}
                                value={selectedCons}
                                onChange={handleConsChange}
                                isMulti={true}
                                getOptionLabel={option=>`${option.name}`}
                                getOptionValue={option=>`${option.id}`}
                            />
                            {/* <Form.Control name="legislative" as="select">
                             <option value="">Select Legislative Assembly</option>
                              {
                                renderConstituency()
                              }
                            </Form.Control> */}
                          </Form.Group>
                      </Col>
                  </Row>
                <Row>     

                </Row>
                                              
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
    )
}
export default Mapping;