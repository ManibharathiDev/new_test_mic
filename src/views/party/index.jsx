import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Parties = () =>{
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Parties</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Party Name</th>
                      <th>Leader Name</th>
                      <th>Head Quarter</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>BJP</td>
                      <td>Mr.Narendrasing Modi JI</td>
                      <td>New Delhi</td>
                      <td>ACTIVE</td>
                      <td>

                      <Link to="#" className="label theme-bg2 text-white f-12">
                      <i className='feather icon-edit'></i> Edit
                      </Link>
                      <Link to="#" className="label theme-bg text-c-red  f-12">
                      <i className='feather icon-delete'></i> Delete
                      </Link>
                        </td>
                    </tr>

                    <tr>
                      <th scope="row">1</th>
                      <td>DMK</td>
                      <td>Mr.Stalin Karunanidhi</td>
                      <td>Chennai</td>
                      <td>ACTIVE</td>
                      <td>

                      <Link to="#" className="label theme-bg2 text-white f-12">
                      <i className='feather icon-edit'></i> Edit
                      </Link>
                      <Link to="#" className="label theme-bg text-c-red  f-12">
                      <i className='feather icon-delete'></i> Delete
                      </Link>
                        </td>
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
export default Parties;