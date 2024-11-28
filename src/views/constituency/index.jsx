import React from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
const Constituency = () =>{

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

  const [cons, setCons] = useState([]);
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

  const fetchNextPrev = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  }

  const deletes = (id,idx) =>{
    const headers = { 'Authorization': bearer };
    let URL = window.API_URL+"country/delete/"+id;
    axios.delete(URL,{ headers })  
    .then(res => {  
      const data = cons.data.filter(item=>item.id !=id);
      setCons({ ...cons, data: data })
    })  
  }

  const renderPaginationLinks = () => {
    return <ul className="pagination">
        {
            cons.links?.map((link,index) => (
                <li key={index} className="page-item">
                    <a style={{cursor: 'pointer'}} className={`page-link ${link.active ? 'active' : ''}`} 
                        onClick={() => fetchNextPrev(link.url)}>
                        {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                    </a>
                </li>
            ))
        }
    </ul>
}

const renderHeader = () => {
  let headerElement = ['#', 'name', 'action']

  return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
  })
}

const renderBody = () => {
  return cons.data?.map((con,index) => (
    <tr key={con.id}>
         <td>{index+1}</td>
        <td>{con.name}</td>
        <td><Link to={`../app/country/edit/${con.id}`} className="label theme-bg2 text-white f-12">
        <i className='feather icon-edit'></i> Edit
        </Link>
        <Link to="#" onClick={()=>deletes(con.id,index)} className="label theme-bg text-c-red  f-12">
        <i className='feather icon-delete'></i> Delete
        </Link></td>
    </tr>
))
}

  const fetchConstituency = async () => {
    try {
      const headers = { 'Authorization': bearer };
      let URL = window.API_URL+"lokconstituency?page="+page;
        const response = await axios.get(URL,{ headers });
        setCons(response.data);
    } catch (error) {
        console.log(error);
    }
}

  useEffect(()=> {
    fetchConstituency();
    }, [page]);
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Country</Card.Title>
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
                            Showing {cons.from} to {cons.to} from {cons.total} results.
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
export default Constituency;