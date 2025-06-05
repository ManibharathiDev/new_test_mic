import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Table,
  Tabs,
  Tab,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
  SplitButton,
  Form
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
const Voters = () => {
  let token = '';
  let bearer = '';
  if (secureLocalStorage.getItem('STATUS') != null) {
    const data = JSON.parse(secureLocalStorage.getItem('STATUS'));
    if (!data.status) {
      window.location.replace('/admin/login');
    }
    token = data.token;
    bearer = 'Bearer ' + token;
  } else {
    window.location.replace('/admin/login');
  }

  const [voters, setVoters] = useState([]);
  const [page, setPage] = useState(1);

  const [loksaba, setLokSaba] = useState([]);
  const [lokId, setLokId] = useState('');
  const [assembly, setAssembly] = useState([]);
  const [assemblyId, setAssemblyId] = useState('');
  const [firstBooth, setFirstBooth] = useState('');
  const [lastBooth, setLastBooth] = useState('');
  const [boothId, setBoothId] = useState('');

  const checkIfTaskIsDone = (done) =>
    done ? <span className="badge bg-success">Done</span> : <span className="badge bg-danger">Processing...</span>;

  const fetchNextPrev = (link) => {
    const url = new URL(link);
    console.log(url.searchParams.get('page'));
    setPage(url.searchParams.get('page'));
  };

  const fetchVoters = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'voter/getbyfilter?page=' + page + '&parliament_id=' + lokId + '&assembly_id=' + assemblyId + '&pagination=1&booth_number=' + boothId;
      const response = await axios.get(URL, { headers });
      setVoters(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConstituency = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'lokconstituency/fetch_all';
      const response = await axios.get(URL, { headers });
      setLokSaba(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLokSabaChange = (e) => {
    var lokId = e.target.value;
    setLokId(lokId);
    //fetchAssembly(lokId);
  };

  const handleBoothChange = (e) => {
    var boothId = e.target.value;
    setBoothId(boothId);
    //fetchAssembly(lokId);
  }

  const handleAssemblyChange = (e) => {
    var assemblyId = e.target.value;
    setAssemblyId(assemblyId);
    assembly.forEach((item) => {
      if (item.id == assemblyId) {
        setFirstBooth(item.first_booth);
        setLastBooth(item.last_booth);
      }
    });
  };

  const renderBooth = () => {
      
    let booth = [];
    for (let i = firstBooth; i <= lastBooth; i++) {
      booth.push(i);
    }
    return booth.map((booth, index) => (
      <option value={booth} key={index}>
        {booth}
      </option>
    ));
  };

  const renderLokSaba = () => {
    return loksaba?.map((lok, index) => (
      <option value={lok.id} key={lok.id}>
        {lok.name}
      </option>
    ));
  };

  const renderAssembly = () => {
    return assembly?.map((assembly, index) => (
      <option value={assembly.id} key={assembly.id}>
        {assembly.name}
      </option>
    ));
  };

  const deleteVoter = (id, idx) => {
    const headers = { Authorization: `Bearer ${bearer}` };
    let URL = `${window.API_URL}voter/delete/${id}`;

    axios.delete(URL, { headers })
        .then((res) => {
            const data = voters.data.filter((item) => item.id !== id);
            setVoters({ ...voters, data: data });
        })
        .catch((error) => {
            alert('Error deleting voter: ' + error.message);
        });
};


  const fetchAssembly = async (lokId) => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'assembly/list?lok_saba_id=' + lokId;
      const response = await axios.get(URL, { headers });
      setAssembly(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderPaginationLinks = () => {
    return (
      <ul className="pagination">
        {voters.links?.map((link, index) => (
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
    let headerElement = ['#', 'name', 'epic number', 'category', 'gender', 'Father Name', 'booth number', 'line', 'Booth Address','Action'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return voters.data?.map((voter, index) => (
      <tr key={voter.id}>
        <td>{index + 1}</td>
        <td>
          <Link
            to={{
              pathname: `../../../../../app/voters/show/${voter.id}`,
              state: { voter }
            }}
          >
            {voter.name}
          </Link>
        </td>
        <td>{voter.epic_number}</td>
        <td>{voter.category}</td>
        <td>{voter.gender}</td>
        <td>{voter.father_name}</td>
        <td>{voter.booth_number}</td>
        <td>{voter.line_number}</td>
        <td>{voter.booth_address}</td>
        <td>
          {/* <Link to={`../app/voter/edit/${voter.id}`} className="label theme-bg2 text-white f-12">
                <i className='feather icon-edit'></i> Edit
                </Link> */}
                <Link to="#" onClick={()=>deleteVoter(voter.id,index)} className="label theme-bg text-c-red  f-12">
                <i className='feather icon-delete'></i> Delete
                </Link></td>
      </tr>
    ));
  };

  useEffect(() => {
    fetchConstituency();
    if (lokId) {
      fetchAssembly(lokId);
      fetchVoters();
    }
    if (assemblyId || boothId) {
      fetchVoters;
    }
    if (page) fetchVoters();
  }, [page, lokId, assemblyId, boothId]);

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
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Constituency</Form.Label>
                    <Form.Control name="constituency" as="select" value={lokId} onChange={handleLokSabaChange}>
                      <option value="">Select Constituency</option>
                      {renderLokSaba()}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Assembly</Form.Label>
                    <Form.Control name="assembly" as="select" value={assemblyId} onChange={handleAssemblyChange}>
                      <option value="">Select Assembly</option>
                      {renderAssembly()}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Booth</Form.Label>
                    <Form.Control name="assembly" as="select" value={boothId} onChange={handleBoothChange}>
                      <option value="">Select Booth</option>
                      {renderBooth()}
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
                  Showing {voters.from} to {voters.to} from {voters.total} results.
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
export default Voters;
