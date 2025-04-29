import React from 'react';
import axios from 'axios';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { Modal, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
const Parties = () => {
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

  const [parties, setParties] = useState([]);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    id: '',
    party_photo: ''
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [previewImage, setPreviewImage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClose = () => setShowPreview(false);
  const handlePreviewShow = (imageUrl) => {
    setPreviewImage(imageUrl);
    setShowPreview(true);
  };

  const checkIfTaskIsDone = (done) =>
    done ? <span className="badge bg-success">Done</span> : <span className="badge bg-danger">Processing...</span>;

  const fetchNextPrevParties = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  };

  const deleteParty = (id, idx) => {
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'party/delete/' + id;
    axios.delete(URL, { headers }).then((res) => {
      const data = parties.data.filter((item) => item.id != id);
      setParties({ ...parties, data: data });
    });
  };

  const hanldeChangeImage = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      id: image.id,
      party_photo: image.party_photo
    };
    const headers = { Authorization: bearer };
    let URL = window.API_URL + 'party/update/photo';
    axios
      .post(URL, userData, { headers })
      .then((response) => {
        console.log(response);
        console.log(response.data.status, response.data.message);
        if (response.data.status == true) {
          setImage({
            id: '',
            party_photo: ''
          });
          setShow(false);
          fetchParties();
        } else {
          alert('Error: ' + response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Error: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log('File read successfully:', reader.result);
      setImage({
        ...image,
        party_photo: reader.result.split(',')[1] // Extract base64 string without the prefix
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const openDialog = (id, idx) => {
    setImage({ ...image, id: id });
    setShow(true);
  };

  const renderPaginationLinks = () => {
    return (
      <ul className="pagination">
        {parties.links?.map((link, index) => (
          <li key={index} className="page-item">
            <a
              style={{ cursor: 'pointer' }}
              className={`page-link ${link.active ? 'active' : ''}`}
              onClick={() => fetchNextPrevParties(link.url)}
            >
              {link.label.replace('&laquo;', '').replace('&raquo;', '')}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const renderHeader = () => {
    let headerElement = ['#', 'icon', 'party name', 'leader name', 'head quarter', 'action'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return parties.data?.map((party, index) => (
      <tr key={party.id}>
        <td>{index + 1}</td>
        <td>
          {party.party_photo ? (
            <img
              src={window.IMG_URL + party.party_photo}
              alt="Party Icon"
              style={{ width: '50px', height: '50px' }}
              onClick={() => handlePreviewShow(window.IMG_URL + party.party_photo)}
            />
          ) : (
            <span>N/A</span>
          )}
        </td>
        <td>{party.name}</td>
        <td>{party.leader}</td>
        <td>{party.head_quarter}</td>
        <td>
          <Link to={`../app/party/edit/${party.id}`} className="label theme-bg2 text-white f-12">
            <i className="feather icon-edit"></i> Edit
          </Link>
          <Link to="#" onClick={() => deleteParty(party.id, index)} className="label theme-bg text-c-red  f-12">
            <i className="feather icon-delete"></i> Delete
          </Link>
          <Link to="#" onClick={() => openDialog(party.id, index)} className="label theme-bg text-c-red  f-12">
            <i className="feather icon-user"></i> Change Icon
          </Link>
        </td>
      </tr>
    ));
  };

  const fetchParties = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'party?page=' + page;
      const response = await axios.get(URL, { headers });
      setParties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchParties();
  }, [page]);
  return (
    <>
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Parties</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>{renderHeader()}</thead>
                  <tbody>{renderBody()}</tbody>
                </Table>
                <div className="my-4 d-flex justify-content-between">
                  <div>
                    Showing {parties.from} to {parties.to} from {parties.total} results.
                  </div>
                  <div>{renderPaginationLinks()}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Party Icon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={hanldeChangeImage}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Party Icon</Form.Label>
                  <Form.Control type="file" name="party_photo" onChange={(e) => handleChange(e)} placeholder="Enter Party Icon" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Button type="submit" className="text-capitalize btn btn-primary" disabled={loading}>
                  {loading ? 'Uploading...' : 'Update'}
                </Button>
                <Button type="reset" className="text-capitalize btn btn-secondary" disabled={loading}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPreview} onHide={handlePreviewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Party Icon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={previewImage} alt="Preview" style={{ width: '100%' }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePreviewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Parties;
