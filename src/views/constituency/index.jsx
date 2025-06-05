import React from 'react';
import axios from 'axios';
import { Row, Col, Card, Table, Tabs, Tab,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
const Constituency = () => {
  let token = '';
  let bearer = '';
  if (secureLocalStorage.getItem('STATUS') != null) {
    console.log('Get');
    const data = JSON.parse(secureLocalStorage.getItem('STATUS'));
    if (!data.status) {
      window.location.replace('/admin/login');
    }
    token = data.token;
    bearer = 'Bearer ' + token;
  } else {
    window.location.replace('/admin/login');
  }

  const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);

  const [cons, setCons] = useState([]);
  const [page, setPage] = useState(1);

  

  const [countryId, setCountryId] = useState('');
  const [stateId,setStateId] = useState('');
    const renderState = () => {
      return state?.map((st, index) => (
        <option value={st.id} key={st.id}>
          {st.name}
        </option>
      ));
    };

      const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name == 'country_id') {
      setCountryId(e.target.value);
    } else if (e.target.name == 'state_id') {
      setStateId(e.target.value);
    }
  };

  const renderCountry = () => {
    return country?.map((cn, index) => (
      <option value={cn.id} key={cn.id}>
        {cn.name}
      </option>
    ));
  };

  const fetchStates = async (id) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'state/country/' + id;
      const response = await axios.get(URL, { headers });
      console.log(response.data.result);
      setState(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountry = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'country/get';
      const response = await axios.get(URL, { headers });
      setCountry(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTaskIsDone = (done) =>
    done ? <span className="badge bg-success">Done</span> : <span className="badge bg-danger">Processing...</span>;

  const fetchNextPrev = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  };

  const deletes = (id, idx) => {
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'parliament/delete/' + id;
    axios.delete(URL, { headers }).then((res) => {
      const data = cons.data.filter((item) => item.id != id);
      setCons({ ...cons, data: data });
    });
  };

  const renderPaginationLinks = () => {
    return (
      <ul className="pagination">
        {cons.links?.map((link, index) => (
          <li key={index} className="page-item">
            <a style={{ cursor: 'pointer' }} className={`page-link ${link.active ? 'active' : ''}`} onClick={() => fetchNextPrev(link.url)}>
              {link.label.replace('&laquo;', '').replace('&raquo;', '')}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const renderHeader = () => {
    let headerElement = ['#', 'name','state','action'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return cons.data?.map((con, index) => (
      <tr key={con.id}>
        <td>{index + 1}</td>
        <td>{con.name}</td>
        <td>{con.state_data?.name}</td>
        <td>
          <Link to={`../app/constituency/edit/${con.id}`} className="label theme-bg2 text-white f-12">
            <i className="feather icon-edit"></i> Edit
          </Link>
          <Link to="#" onClick={() => deletes(con.id, index)} className="label theme-bg text-c-red  f-12">
            <i className="feather icon-delete"></i> Delete
          </Link>
        </td>
      </tr>
    ));
  };

  const fetchConstituency = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'parliament/getall?page=' + page+ '&state_id=' + stateId;
      const response = await axios.get(URL, { headers });
      setCons(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
    if (countryId) fetchStates(countryId);
    if (stateId || page)    
      fetchConstituency();
  }, [page,countryId,stateId]);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Parliaments</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label>Country</Form.Label>
                      <Form.Control name="country_id" as="select" value={countryId} onChange={handleChange}>
                        <option value="">Select Country</option>
                        {renderCountry()}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label>State</Form.Label>
                      <Form.Control name="state_id" as="select" value={stateId} onChange={handleChange}>
                        <option value="">Select State</option>
                        {renderState()}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>  
              <Table responsive>
                <thead>{renderHeader()}</thead>
                <tbody>{renderBody()}</tbody>
              </Table>
              <div className="my-4 d-flex justify-content-between">
                <div>
                  Showing {cons.from} to {cons.to} from {cons.total} results.
                </div>
                <div>{renderPaginationLinks()}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Constituency;
