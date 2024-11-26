import React from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
const Parties = () =>{

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

  const [parties, setParties] = useState([]);
  const [page, setPage] = useState(1);

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

  const fetchNextPrevParties = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  }

  const deleteParty = (id,idx) =>{
    const headers = { 'Authorization': bearer };
    let URL = window.API_URL+"party/delete/"+id;
    axios.delete(URL,{ headers })  
    .then(res => {  
      const data = parties.data.filter(item=>item.id !=id);
      setParties({ ...parties, data: data })
    })  
  }

  const renderPaginationLinks = () => {
    return <ul className="pagination">
        {
            parties.links?.map((link,index) => (
                <li key={index} className="page-item">
                    <a style={{cursor: 'pointer'}} className={`page-link ${link.active ? 'active' : ''}`} 
                        onClick={() => fetchNextPrevParties(link.url)}>
                        {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                    </a>
                </li>
            ))
        }
    </ul>
}

const renderHeader = () => {
  let headerElement = ['#', 'party name', 'leader name', 'head quarter', 'status','action']

  return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
  })
}

const renderBody = () => {
  return parties.data?.map((party,index) => (
    <tr key={party.id}>
         <td>{index+1}</td>
        <td>{party.name}</td>
        <td>{party.leader}</td>
        <td>{party.head_quarter}</td>
        <td>{party.head_quarter}</td>
        <td>{party.head_quarter}</td>
        <td><Link to="#" className="label theme-bg2 text-white f-12">
        <i className='feather icon-edit'></i> Edit
        </Link>
        <Link to="#" onClick={()=>deleteParty(party.id,index)} className="label theme-bg text-c-red  f-12">
        <i className='feather icon-delete'></i> Delete
        </Link></td>
    </tr>
))
}

  const fetchParties = async () => {
    try {
      const headers = { 'Authorization': bearer };
      let URL = window.API_URL+"party?page="+page;
        const response = await axios.get(URL,{ headers });
        setParties(response.data);
    } catch (error) {
        console.log(error);
    }
}

  useEffect(()=> {
    fetchParties();
    }, [page]);
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Parties</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    {renderHeader()}
                  </thead>
                  <tbody>
                    {renderBody()} 
                  </tbody>
                </Table>
                <div className="my-4 d-flex justify-content-between">
                        <div>
                            Showing {parties.from} to {parties.to} from {parties.total} results.
                        </div>
                        <div>
                            {renderPaginationLinks()}
                        </div>
                    </div>
              </Card.Body>
            </Card>
            
            
          </Col>
        </Row>
      </React.Fragment>
    );
  };
export default Parties;