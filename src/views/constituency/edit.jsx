import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { useParams } from 'react-router-dom';

const EditConstituency = () => {
  const { id } = useParams();
  const [state, setState] = useState([]);
  const [data, setData] = useState({ state_id: '', name: '' });
const [isSubmitting, setIsSubmitting] = useState(false); 
  useEffect(() => {
    const authData = secureLocalStorage.getItem('STATUS');
    if (!authData) return window.location.replace('/admin/login');

    const parsedData = JSON.parse(authData);
    if (!parsedData.status) return window.location.replace('/admin/login');

    const bearer = `Bearer ${parsedData.token}`;

    const fetchStates = async () => {
      try {
        const response = await axios.get(`${window.API_URL}state?country_id=1`, {
          headers: { Authorization: bearer },
        });
        setState(response.data.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    const fetchParliamentById = async () => {
      try {
        const response = await axios.get(`${window.API_URL}parliament/show/${id}`, {
          headers: { Authorization: bearer },
        });

        if (response.data.status) {
          setData({
            state_id: response.data.data[0]?.state_data.id || '',
            name: response.data.data[0]?.name || '',
          });
        } else {
          console.error('Transaction error');
        }
      } catch (error) {
        console.error('Error fetching parliament data:', error);
      }
    };

    fetchStates();
    fetchParliamentById();
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button when submitting
    const authData = JSON.parse(secureLocalStorage.getItem('STATUS'));
    const bearer = `Bearer ${authData.token}`;

    try {
      const response = await axios.put(`${window.API_URL}lokconstituency/update/${id}`, data, {
        headers: { Authorization: bearer },
      });

      if (response.data.status) {
        setData({ state_id: '', name: '' });
        window.location.replace('/admin/app/constituency/view');
      } else {
        alert(`Transaction Error: ${response.data.message}`);
        setIsSubmitting(false); 
      }
    } catch (error) {
      alert(`Transaction Error: ${error}`);
      setIsSubmitting(false);
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Edit Parliament</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control name="state_id" as="select" value={data.state_id} onChange={handleChange}>
                      <option value="">Select State</option>
                      {state.map((st) => (
                        <option value={st.id} key={st.id}>
                          {st.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name of the Parliament</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      placeholder="Enter the name of the Parliament"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Button type="submit" className="btn btn-primary" disabled={isSubmitting}>
  {isSubmitting ? "Updating..." : "Update"}
</Button>
                  <Button type="reset" className="btn btn-secondary">
                    Clear
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditConstituency;
