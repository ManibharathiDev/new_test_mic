import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';

import { Link } from 'react-router-dom';
const Users = () =>{
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">User Details</Card.Title>
                <Button>Create New User</Button>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>User Code</th>
                      <th>Party</th>
                      <th>Status</th>
                      <th>Action</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Manibharathi</td>
                      <td>manibharath159@gmail.com</td>
                      <td>BJP002</td>
                      <td>BJP</td>
                      <td>ACTIVE</td>
                      <td><span>Edit</span>&nbsp;<span>Delete</span></td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                      <td>Mariappan</td>
                      <td>mariappan@gmail.com</td>
                      <td>BJP003</td>
                      <td>BJP</td>
                      <td>ACTIVE</td>
                      <td><span>Edit</span>&nbsp;<span>Delete</span></td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                      <td>Senthilkumar</td>
                      <td>senthilkumar@gmail.com</td>
                      <td>ADMK001</td>
                      <td>ADMK</td>
                      <td>IN-ACTIVE</td>
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
export default Users;