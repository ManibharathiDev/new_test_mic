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
    const [partyId,setPartyId] = useState("");
    const [loksabaId,setLokSabaId] = useState("");
    const [userId,setUserId] = useState("");
    const [amount,setAmount] = useState("");
    const [from_date,setFromDate] = useState("");
    const [to_date,setToDate] = useState("");
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
          let URL = window.API_URL+"lokconstituency/fetch_all";
          const response = await axios.get(URL,{ headers });
          setLokSaba(response.data.data);
      } catch (error) {
          console.log(error);
      }
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

      const handlePartyChange = (e) =>{
        setPartyId(e.target.value);
        fetchUsers(e.target.value);
      }
  
      const handleLokSabaChange = (e) =>{
          var lokId = e.target.value;
          setLokSabaId(lokId);
          fetchConstitency(lokId)
      }

      const handleUserChange = (e) =>{
          setUserId(e.target.value);
      }

      const fetchUsers = async(partyId) =>{
        try {
            const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"party/user/"+partyId;
            const response = await axios.get(URL,{ headers });
            setUsers(response.data.data);
          } catch (error) {
              console.log(error);
          }
      }
  
      const fetchConstitency = async (lokId) =>{
        try {
          const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"constituency/places/"+lokId;
          const response = await axios.get(URL,{ headers });
          setConstituency(response.data.data);
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

      const handleConsChange = (selectedCon)=>{
        setSelectedCons(selectedCon);
        console.log(selectedCons);
      }

      const handleFromDate = (e) =>{
        setFromDate(e.target.value);
      }

      const handleAmount = (e) =>{
        setAmount(e.target.value);
      }

      const handleToDate = (e) => {
        setToDate(e.target.value);
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        let formData = [];
        let data = {};
        selectedCons.map((data,index)=>{
            let details = {};
            details['party_id'] = partyId;
            details['user_id'] = userId;
            details['parliament_id'] = loksabaId;
            details['created_by'] = 1;
            details['status'] = "Active";
            details['amount'] = amount;
            details['from_date'] = from_date;
            details['to_date'] = to_date;
            details['assembly_id'] = data['id'];
            formData.push(details);
        });
        data['data'] = formData;
        

        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"userassembly/bulkinsert";
        axios.post(URL,data,{headers})
        .then((response)=>{
            if(response.data.status)
            {
              setSelectedCons([]);
              setConstituency("")
              setLokSabaId("");
              setFromDate("");
              setToDate("");
              setPartyId("");
              setUserId("");
            }
        });

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
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" name="amount" value={amount} onChange={handleAmount} placeholder="Enter the amount" />
                          </Form.Group>
                      </Col>
                      

                  </Row>
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

                            <Form.Control name="users" as="select" onChange={handleUserChange}>
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
                            <Form.Label>Assembly</Form.Label>
                            <Select
                                options={constituency}
                                value={selectedCons}
                                onChange={handleConsChange}
                                isMulti={true}
                                getOptionLabel={option=>`${option.name}`}
                                getOptionValue={option=>`${option.id}`}
                            />
                          
                          </Form.Group>
                      </Col>
                  </Row>

                  <Row>
                      <Col md={6}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>From Date</Form.Label>
                            <Form.Control type="date" name="from_date" value={from_date} onChange={handleFromDate} placeholder="Enter the from date" />
                          </Form.Group>
                      </Col>
                      <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>To Date</Form.Label>
                            <Form.Control type="date" name="to_date" value={to_date} onChange={handleToDate} placeholder="Enter the to date" />
                          
                          </Form.Group>
                      </Col>
                  </Row>              

                <Row>  
                 <div className='mic-single-btn'>
                <Button type="button" className="text-capitalize btn btn-primary" style={{
                  width:"100px"
                }} onClick={handleSubmit}>Submit</Button>  
               </div>

                </Row>
                                              
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
    )
}
export default Mapping;