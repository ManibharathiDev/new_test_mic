import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import MultipleValueTextInput from 'react-multivalue-text-input';
import * as XLSX from 'xlsx';
const Imports = () => {
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
        const [district,setDistrict] = useState([]);
        const [districtId,setDistrictId] = useState("");
        const [panjayath,setPanjayath] = useState([]);
        const [panjayathId,setPanjyathId] = useState("");

        const [excels,setExcels] = useState(null);
       
          const [data, setData] = useState({
            district_id: "",
            panjayath_id:"",
            name:""
          });  

          const handleChange = (e) =>{
            const value = e.target.value
            setData({
              ...data,[e.target.name]:e.target.value
            });

            if(e.target.name == "district_id"){
                setDistrictId(value);
            }

        };

        

        const fetchDistrict = async () =>{
            try {
              const headers = { 'Authorization': bearer };
              let URL = window.API_URL+"districts";
              const response = await axios.get(URL,{ headers });
              setDistrict(response.data.data);
          } catch (error) {
              console.log(error);
          }
          }
       
       const fetchDistrictName = () =>{

             const item = district.find(item => item.id === parseInt(data.district_id));
             console.log("Name "+item);
             return item ? item.name : "N/A";
       }
       
       const fetchPanjayathName = (id) =>{
        const item = panjayath.find(item => item.id === parseInt(data.panjayath_id));
        return item ? item.name : "";
   }

       const fetchPanjyath = async (id) =>{
          try {
            const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"panjayath/lists?pagination=&district_id="+id
            const response = await axios.get(URL,{ headers });
            setPanjayath(response.data.data);
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

              const renderPanjayath = () =>{
                return panjayath?.map((dist,index) => (
                  <option value={dist.id} key={dist.id}>
                      {dist.name}
                  </option>
              ))
              }

              const handleUpload = (e) =>{
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onload = (event) => {
                          const workbook = XLSX.read(event.target.result, { type: 'binary' });
                          const sheetName = workbook.SheetNames[0];
                          const sheet = workbook.Sheets[sheetName];
                          const sheetData = XLSX.utils.sheet_to_json(sheet);
                          console.log("Data",sheetData);
                          setExcels(sheetData);
                        };
                    
                        reader.readAsBinaryString(file);
                  }


                const handleSubmit = (e) => {
                    e.preventDefault();
                    const userData = {
                        district_id: data.district_id,
                        panjayath_id:data.panjayath_id,
                        village:excels,
                    };
                    const headers = { 'Authorization': bearer };
                    let URL = window.API_URL+"village/bulkinsert";
                    axios.post(URL,userData,{headers})
                    .then((response)=>{
                      console.log(response);
                      console.log(response.data.status, response.data.message);
                        if(response.data.status == true)
                        {
                          setData({
                            district_id: "",
                            panjayath_id:"",
                            village:""
                          });
                          setExcels(null);
                        }
                        else{
                            alert("Error");
                        }
                    });   
                } 
        
                const renderHeader = () => {
                    let headerElement = ['#', 'District', 'Panjayath', 'Village']
                  
                    return headerElement.map((key, index) => {
                        return <th key={index}>{key.toUpperCase()}</th>
                    })
                  }   
                  
                  const renderBody = () => {
                    return excels?.map((user,index) => (
                      <tr key={index}>
                           <td>{index+1}</td>
                          <td>{fetchDistrictName()}</td>
                          <td>{fetchPanjayathName()}</td>
                          <td>{user.name}</td>
                      </tr>
                  ))
                  }      
          
          useEffect(()=> {
            fetchDistrict();
            if(districtId)
              fetchPanjyath(districtId);
            }, [districtId]);

        return(
            <>
                <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Bulk Import Grama Panjayath</Card.Title>
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
                            <Form.Label>Panjayath</Form.Label>
                            <Form.Control name="panjayath_id" as="select" value={data.panjayath_id} onChange={handleChange}>
                            <option value="">Select Panjayath</option>
                              {
                                renderPanjayath()
                              }
                            </Form.Control>
                          </Form.Group>
                      </Col>  
                      </Row>
                      <Row>      

                      <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Choose Grama Panjayath Excel:</Form.Label>
                            <Form.Control className="mx-2" type='file' onChange={handleUpload} />
                          </Form.Group>
                       
                      </Col>
                      
                  </Row>
                <Row>
                <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">
                <Button type="button" className="text-capitalize btn btn-primary" onClick={handleSubmit}>Upload</Button>
                    </Form.Group>
                </Row>
                 </Form>    

                 <Table responsive className='my-5'>
                                     <thead>
                                       <tr>
                                         {renderHeader()}
                                       </tr>
                                     </thead>
                                     <tbody>
                                     {
                                                 renderBody()
                                               }     
                                           </tbody>
                                   </Table>  

                </Card.Body>
                </Form>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
            </>
        );    

}
export default Imports;