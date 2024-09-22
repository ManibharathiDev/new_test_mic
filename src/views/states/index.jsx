import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const States = () =>{
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">State Details</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>State Name</th>
                      <th>Code</th>
                      <th>Country Name</th>
                      <th>Status</th>
                      <th>Action</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Tamilnadu</td>
                      <td>TN</td>
                      <td>India</td>
                      <td>ACTIVE</td>
                      <td><span>Edit</span>&nbsp;<span>Delete</span></td>
                    </tr>
                    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            
            
          </Col>
        </Row>
      </React.Fragment>
    );
  };
export default States;