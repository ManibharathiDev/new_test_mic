import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';

import { Link } from 'react-router-dom';
const CreateParties = () =>{
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Create New Party</Card.Title>
               
              </Card.Header>
                 <CardBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Name of the Party</Form.Label>
                                <Form.Control type="text" placeholder="Enter the name of the Party" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter the Description" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formLeder">
                                <Form.Label>Name of the Leader</Form.Label>
                                <Form.Control type="text" placeholder="Enter the name of the Leader" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Head Quarter</Form.Label>
                                <Form.Control type="text" placeholder="Enter the Head Quarter Name" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Year of Start</Form.Label>
                                <Form.Control type="number" placeholder="Enter the year of start" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter the Email Address" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Contact Person 1</Form.Label>
                                <Form.Control type="text" placeholder="First Contact Person Name" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Contact Person 1</Form.Label>
                                <Form.Control type="text" placeholder="Second Contact Person Name" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNameParty">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter the official Mobile Number" />
                                
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Landline(If available)</Form.Label>
                                <Form.Control type="text" placeholder="Enter the Landline Number" />
                                
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Button type="submit" className="text-capitalize btn btn-primary">Save</Button>
                                <Button type="reset" className="text-capitalize btn btn-secondary">Clear</Button>
                            </Col>
                        </Row>


                    </Form>
                 </CardBody>   
            </Card>
            
            
          </Col>
        </Row>
      </React.Fragment>
    );
  };
export default CreateParties;