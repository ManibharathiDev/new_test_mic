import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab,Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton, CardBody, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import * as XLSX from 'xlsx';
const VotersImport = () =>{
    const [data,setData] = useState(null);
    const handleUpload = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);
            console.log("Data",sheetData);
            setData(sheetData);
          };
      
          reader.readAsBinaryString(file);
    }
    return (
        <React.Fragment>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Import Voters</Card.Title>
                </Card.Header>
                <Card.Body>
                <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="file" name="name" onChange={handleUpload} placeholder="Enter the name" />
                                
                            </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      );
}
export default VotersImport;