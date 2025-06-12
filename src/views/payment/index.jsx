import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Table } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';

const Payments = () => {
  const [payments, setPayments] = useState([]); // Fixed state initialization

  let token = '';
  let bearer = '';

  if (secureLocalStorage.getItem('STATUS') !== null) {
    console.log('Get');
    const data = JSON.parse(secureLocalStorage.getItem('STATUS'));

    if (!data.status) {
      window.location.replace('/admin/login');
    }
    
    token = data.token;
    bearer = `Bearer ${token}`;
  } else {
    window.location.replace('/admin/login');
  }

  const fetchPayments = async () => {
    try {
      const headers = { Authorization: bearer };
      let URL = `${window.API_URL}plan/lists?status=`;

      const response = await axios.get(URL, { headers });

      setPayments(response.data.data || []); // Ensuring valid data structure
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [token]); // Added dependency for re-fetching when `token` updates

  const renderHeader = () => {
    const headerElement = ['#', 'First Amount', 'Next Amount', 'Status', 'Actions'];

    return headerElement.map((key, index) => (
      <th key={index}>{key.toUpperCase()}</th>
    ));
  };

  const deActivate = (id, idx) => {
    const headers = { Authorization: bearer };
    let URL = `${window.API_URL}plan/update/${id}`;
    const data = payments[idx]; // Get the payment data for the specific index
    const userData = {
      first_amount: data.first_amount,
      second_amount: data.second_amount,
      status: 0
    };
    axios.put(URL, userData,{ headers })
      .then((res) => {
        console.log(res);
        console.log(res.data.status, res.data.message);
        if (res.data.status === true) {
          const updatedPayments = [...payments];
          updatedPayments[idx].status = 0; // Assuming 0 is for inactive
          setPayments(updatedPayments);
        } else {
          console.error("Failed to deactivate payment:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting payment:", error);
      });
  };

  const renderBody = () => {
  return payments.map((payment, index) => (
    <tr key={payment.id}>
      <td>{index + 1}</td>
      <td>{payment.first_amount}</td>
      <td>{payment.second_amount}</td>
      <td>{payment.status === 1 ? "Active" : "Inactive"}</td>
      <td>
        {payment.status === 1 && (
          <Link to="#" onClick={() => deActivate(payment.id, index)} className="label theme-bg text-c-red f-12">
            <i className="feather icon-delete"></i> Deactivate
          </Link>
        )}
      </td>
    </tr>
  ));
};



  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Payments</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>{renderHeader()}</thead>
                <tbody>{renderBody()}</tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Payments;
