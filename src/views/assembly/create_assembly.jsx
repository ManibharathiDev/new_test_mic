import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import MultipleValueTextInput from 'react-multivalue-text-input';
const CreateAssembly = () =>{
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
    const [lokId,setLokId] = useState("");
    const [rows, setRows] = useState([
        { id: 1, name: '', first_booth: '',last_booth:'',seq:'',status:'Active',state_id:1,district_id:'' },
      ]);
    const renderLokSaba = () =>{
        return loksaba?.map((lok,index) => (
          <option value={lok.id} key={lok.id}>
              {lok.name}
          </option>
      ))
      }

    const addRow = () =>{
        setRows([...rows, { id: rows.length + 1, name: '', first_booth: '',last_booth:'',seq:'',status:'Active',state_id:1,district_id:''}]);
    }  

    const handleReset = () => {
      setRows([
        { id: 1, name: '', first_booth: '', last_booth: '', seq: '', status: 'Active', state_id: 1, district_id: '' },
      ]);
    };

      const renderHeader = () => {
        let headerElement = ['#', 'Assembly Name', 'First Booth', 'Last Booth','Sequence','Action']
      
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
      }

      const handleLokSabaChange = (e) =>{
        var lokId = e.target.value;
        setLokId(lokId);
        }  

    const fetchLokSaba = async () =>{
        try {
          const headers = { 'Authorization': bearer };
          let URL = window.API_URL+"lokconstituency/fetch_all";
          const response = await axios.get(URL,{ headers });
          setLokSaba(response.data.result);
      } catch (error) {
          console.log(error);
      }
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const assemblyData = {
            lok_saba_id: lokId,
            data: rows,
        };
        const headers = { 'Authorization': bearer };
        let URL = window.API_URL+"assembly/bulkupload";
        axios.post(URL,assemblyData,{headers})
        .then((response)=>{
          console.log(response);
          console.log(response.data.status, response.data.message);
            if(response.data.status == true)
            {
                alert("Inserted");
                handleReset();
            }
            else{
              alert("Error");
            }
        });
        
        console.log("Assembly Data",assemblyData);
    }

      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
      };

      const handleDeleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
      };

      useEffect(()=> {
        fetchLokSaba();
        }, []);
      return(
        <>
            <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Create Loksaba Constituency</Card.Title>
                </Card.Header>
                <Card.Body>
                <Form onSubmit={handleSubmit}>       
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
                  </Row>

                    <Row>
                    <button onClick={addRow}>Add Row</button> 
                       
                    <Table responsive>
                  <thead>
                    <tr>
                      {renderHeader()}
                    </tr>
                  </thead>
                  <tbody>
                  {rows.map((row, index) => (
                        <tr key={row.id}>
                        <td>{row.id}</td>
                        <td><input type="text" name="name" value={row.name}  onChange={(e) => handleInputChange(e, index)}/></td>
                        <td><input type="text" name="first_booth" value={row.first_booth} onChange={(e) => handleInputChange(e, index)}/></td>
                        <td><input type="text" name="last_booth" value={row.last_booth} onChange={(e) => handleInputChange(e, index)}/></td>
                        <td><input type="text" name="seq" value={row.seq} onChange={(e) => handleInputChange(e, index)}/></td>
                        <td><button onClick={() => handleDeleteRow(index)}>Delete</button></td>
                        </tr>
                    ))}       
                            </tbody>
                </Table>
                    </Row>            
               

                        <Row>
                            <Col md={12}>
                                <Button type="submit" className="text-capitalize btn btn-primary">Save</Button>
                                <Button type="reset" className="text-capitalize btn btn-secondary">Clear</Button>
                            </Col>
                        </Row>
                
                    </Form>                          
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
        </>
      );
}
export default CreateAssembly;