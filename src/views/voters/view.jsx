import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
  CardBody,
  Form
} from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { useLocation, useParams } from 'react-router-dom';
const ViewVoter = () => {
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
  const { id } = useParams();
  const location = useLocation();

  console.log('Voters data', location.state);

  const [voter, setVoter] = useState({});

  const fetchVoterDetailsById = () => {
    try {
      const headers = { Authorization: bearer };
      let URL = window.API_URL + 'party/' + id;
      axios
        .get(URL, { headers })
        .then((response) => {
          console.log(response.data);
          setVoter(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVoterDetailsById();
  }, [id]);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">View voter</Card.Title>
            </Card.Header>
            <CardBody>
              <table className="table table-bordered table-striped">
                <tr>
                  <td>Voter Name</td>
                  <td>
                    <strong>{voter?.name}</strong>
                  </td>
                  <td>Epic Number</td>
                  <td>
                    <strong>{voter?.epic_number}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Voter's Category</td>
                  <td>
                    <strong>{voter?.category}</strong>
                  </td>
                  <td>Voter's Color code</td>
                  <td>
                    <strong>{voter?.color}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Parliament</td>
                  <td>
                    <strong>{voter?.parliament_name}</strong>
                  </td>
                  <td>Assembly</td>
                  <td>
                    <strong>{voter?.assembly_name}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Booth Number</td>
                  <td>
                    <strong>{voter?.booth_number}</strong>
                  </td>
                  <td>Booth Address</td>
                  <td>
                    <strong>{voter?.booth_address}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Line Number</td>
                  <td>
                    <strong>{voter?.line_number}</strong>
                  </td>
                  <td>Age</td>
                  <td>
                    <strong>{voter?.age}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Mobile Number</td>
                  <td>
                    <strong>{voter?.mobile_number}</strong>
                  </td>
                  <td>Email ID</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Father's Name</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                  <td>Husband's Name</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                </tr>

                <tr>
                  <td>District</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                  <td>Ward Type</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Ward Name</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                  <td>Ward Number</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Qualification</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                  <td>Occupation</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Job Seeker</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                  <td>Taking life-saving meds?</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Job Seeker</td>
                  <td>
                    <strong>Yes</strong>
                  </td>
                  <td>Taking life-saving meds?</td>
                  <td>
                    <strong>No</strong>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Childrens between 5 & 13 years</strong>
                  </td>
                </tr>

                <tr>
                  <td>Male</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                  <td>Female</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Government Employees at home</strong>
                  </td>
                </tr>

                <tr>
                  <td>Male</td>
                  <td>
                    <strong>5</strong>
                  </td>
                  <td>Female</td>
                  <td>
                    <strong>6</strong>
                  </td>
                </tr>

                <tr>
                  <td>Religion</td>
                  <td>
                    <strong>Hindu</strong>
                  </td>
                  <td>Community</td>
                  <td>
                    <strong>MBC</strong>
                  </td>
                </tr>

                <tr>
                  <td>Caste</td>
                  <td>
                    <strong>Hindu</strong>
                  </td>
                  <td>Sub-caste</td>
                  <td>
                    <strong>MBC</strong>
                  </td>
                </tr>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default ViewVoter;
