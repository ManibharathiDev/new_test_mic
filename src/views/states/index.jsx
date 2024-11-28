import React from 'react';
import axios from "axios";
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
const States = () =>{

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

  const [states, setStates] = useState([]);
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
    let URL = window.API_URL+"state/delete/"+id;
    axios.delete(URL,{ headers })  
    .then(res => {  
      const data = countries.data.filter(item=>item.id !=id);
      setStates({ ...countries, data: data })
    })  
  }

  const renderPaginationLinks = () => {
    return <ul className="pagination">
        {
            states.links?.map((link,index) => (
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
  let headerElement = ['#', 'name', 'country']

  return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
  })
}

const renderBody = () => {
  return states.data?.map((state,index) => (
    <tr key={state.id}>
         <td>{index+1}</td>
        <td>{state.name}</td>
        <td>{state.country_id}</td>
        <td><Link to={`../app/state/edit/${state.id}`} className="label theme-bg2 text-white f-12">
        <i className='feather icon-edit'></i> Edit
        </Link>
        <Link to="#" onClick={()=>deletes(state.id,index)} className="label theme-bg text-c-red  f-12">
        <i className='feather icon-delete'></i> Delete
        </Link></td>
    </tr>
))
}

  const fetchStates = async () => {
    try {
      const headers = { 'Authorization': bearer };
      let URL = window.API_URL+"state?page="+page;
        const response = await axios.get(URL,{ headers });
        setStates(response.data);
    } catch (error) {
        console.log(error);
    }
}

  useEffect(()=> {
    fetchStates();
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
                            Showing {states.from} to {states.to} from {states.total} results.
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
export default States;