import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
const Voters = () =>{
    let token = "";
    let bearer = ""
    if(secureLocalStorage.getItem("STATUS") != null)
      {
          console.log("Get");
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
  
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    const [loksaba, setLokSaba] = useState([]);
    const [lokId,setLokId] = useState("");
    const [assembly,setAssembly] = useState([]);
    const [assemblyId,setAssemblyId] = useState("");
  
    const checkIfTaskIsDone = (done) => (
      done ? 
          (
              <span className='badge bg-success'>
                  Done
              </span>
          )
          :
          (
              <span className='badge bg-danger'>
                  Processing...
              </span>
          )
  )
  
    const fetchNextPrevTasks = (link) => {
      const url = new URL(link);
      setPage(url.searchParams.get('page'));
    }
      const fetchConstituency = async () =>{
        try {
          const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"lokconstituency/fetch_all";
          const response = await axios.get(URL,{ headers });
          setLokSaba(response.data.data);
      } catch (error) {
          console.log(error);
      }
      }

      const handleLokSabaChange = (e) =>{
        var lokId = e.target.value;
        setLokId(lokId);
        //fetchAssembly(lokId);
        }

        const handleAssemblyChange = (e) =>{
          var assemblyId = e.target.value; 
          setAssemblyId(assemblyId);
        }

        const renderLokSaba = () =>{
          return loksaba?.map((lok,index) => (
            <option value={lok.id} key={lok.id}>
                {lok.name}
            </option>
        ))
        }

        const renderAssembly = () =>{
          return assembly?.map((assembly,index) => (
            <option value={assembly.id} key={assembly.id}>
                {assembly.name}
            </option>
        ))
        }

        const fetchAssembly = async(lokId) =>{
          try {
            const headers = { 'Authorization': bearer };
              let URL = window.API_URL+"assembly/list?lok_saba_id="+lokId;
              const response = await axios.get(URL,{ headers });
              setAssembly(response.data.data);
          } catch (error) {
              console.log(error);
          }
        }
  
    useEffect(()=> {
      fetchConstituency();
      if(lokId)
        fetchAssembly(lokId);
      }, [lokId]);
  
      return (
        <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Voters Details</Card.Title>
                </Card.Header>
                <Card.Body>

                <Row>
               
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                              <Form.Label>Constituency</Form.Label>
                              <Form.Control name="constituency" as="select" value={lokId} onChange={handleLokSabaChange}>
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
                              <Form.Control name="assembly" as="select" value={assemblyId} onChange={handleAssemblyChange}>
                               <option value="">Select Assembly</option>
                                {
                                  renderAssembly()
                                }
                              </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                  <Table responsive>
                    <thead>
                      <tr>
                        
                      </tr>
                    </thead>
                    <tbody>
                          </tbody>
                  </Table>
                  
                </Card.Body>
              </Card>
              
              
            </Col>
          </Row>
        </React.Fragment>
      );
    };
  export default Voters;