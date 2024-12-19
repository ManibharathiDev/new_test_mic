import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';
const ViewSubcaste = () =>{
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
    
    const [caste,setCaste] = useState([]);
    const [page,setPage] = useState("1");
    

      const fetchCaste = async(page) =>{
       
        try {
            const headers = { 'Authorization': bearer };
            let URL = window.API_URL+"caste?page="+page;
            const response = await axios.get(URL,{ headers });
            setCaste(response.data);
        } catch (error) {
            console.log(error);
        }
      }
    const renderHeader = () => {
      let headerElement = ['#', 'Caste','action']
    
      return headerElement.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
    }

    const deleteLoksaba = (id,idx)=>{
      const headers = { 'Authorization': bearer };
      let URL = window.API_URL+"constituency/delete/"+id;
      axios.delete(URL,{ headers })  
    .then(res => {  
      setConstituency((data) =>
        data.filter((item) => item.id !== id));
    })  
    }

    const renderBody = () => {
      return caste.data?.map((data,index) => (
        <tr key={data.id}>
             <td>{index+1}</td>
            <td>{data.name}</td>
                    <td>
            <Link to={`../app/assembly/edit/${data.id}`} className="label theme-bg2 text-white f-12">
            <i className='feather icon-edit'></i> Edit
            </Link>
              <Link to="#" onClick={()=>deleteLoksaba(data.id,index)} className="label theme-bg text-c-red  f-12">
            <i className='feather icon-delete'></i> Delete
        </Link>
            </td>
        </tr>
    ))
    }

  useEffect(()=> {
    if(page)
        fetchCaste();
    }, [page]);
    return (
      <React.Fragment>


        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Community Details</Card.Title>
              </Card.Header>
              <Card.Body>
              <Table responsive>
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
            </Card>
            
            
          </Col>
        </Row>
      </React.Fragment>
    );
  };
export default ViewSubcaste;