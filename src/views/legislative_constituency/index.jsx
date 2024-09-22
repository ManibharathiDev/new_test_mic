import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const LegislativeConstituency = () =>{
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Legislative Constituency</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Constituency Name</th>
                      <th>District</th>
                      <th>Locsabha</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Kanyakumari</td>
                      <td>Kanyakumari</td>
                      <td>Kanyakumari</td>
                      <td>ACTIVE</td>
                      <td><span>Edit</span>&nbsp;<span>Delete</span></td>
                    </tr>

                    <tr>
                      <th scope="row">1</th>
                      <td>Nagercoil</td>
                      <td>Kanyakumari</td>
                      <td>Kanyakumari</td>
                      <td>ACTIVE</td>
                      <td><span>Edit</span>&nbsp;<span>Delete</span></td>
                    </tr>

                    <tr>
                      <th scope="row">1</th>
                      <td>Colachel</td>
                      <td>Kanyakumari</td>
                      <td>Kanyakumari</td>
                      <td>ACTIVE</td>
                      <td><span>Edit</span>&nbsp;<span>Delete</span></td>
                    </tr>

                    <tr>
                      <th scope="row">1</th>
                      <td>Padmanabapuram</td>
                      <td>Kanyakumari</td>
                      <td>Kanyakumari</td>
                      <td>ACTIVE</td>
                      <td><span>Edit</span>&nbsp;<span>Delete</span></td>
                    </tr>

                    <tr>
                      <th scope="row">1</th>
                      <td>Vilavancode</td>
                      <td>Kanyakumari</td>
                      <td>Kanyakumari</td>
                      <td>ACTIVE</td>
                      <td><span>Edit</span>&nbsp;<span>Delete</span></td>
                    </tr>

                    <tr>
                      <th scope="row">1</th>
                      <td>Killiyoor</td>
                      <td>Kanyakumari</td>
                      <td>Kanyakumari</td>
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
export default LegislativeConstituency;