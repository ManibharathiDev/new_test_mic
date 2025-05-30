import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  CardBody} from 'react-bootstrap';
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

  const [voter, setVoter] = useState({});

  const fetchVoterDetailsById = () => {
    try {
      const headers = { Authorization: bearer };

      let URL = window.API_URL + 'voter/get_all?id=' + id;
      axios
        .get(URL, { headers })
        .then((response) => {
          console.log(response.data.data[0]);
          setVoter(response.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const profileImage = {
    width: '150px',
    height: '180px',
    borderRadius: '25px',
    margin: '10px',
    border: '1px solid #000',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
    
  }

  
const calculateAge = (date) => {
    if(date === null || date === undefined || date === '') {
      return '';
    }
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    }
    return age;
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
                  <td>
                    <img src={`${window.IMG_URL}uploads/${voter?.profile_image}`} style={profileImage} alt="Profile" />
                  </td>
                </tr>

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
                  <td>Section</td>
                  <td>
                    <strong>{voter?.section}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Date of birth</td>
                  <td>
                    <strong>{voter?.date_of_birth}</strong>
                  </td>
                  <td>Age</td>
                  <td>
                    <strong>{calculateAge(voter?.date_of_birth)}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Mobile Number</td>
                  <td>
                    <strong>{voter?.mobile_number}</strong>
                  </td>
                  <td>Whatsapp Number</td>
                  <td>
                    <strong>{voter?.whatsapp_number}</strong>
                  </td>
                </tr>
                <tr>
                  
                  <td>Email ID</td>
                  <td>
                    <strong>{voter?.email}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Relative Name</td>
                  <td>
                    <strong>{voter?.relative_name}</strong>
                  </td>
                  <td>Relationship</td>
                  <td>
                    <strong>{voter?.relation}</strong>
                  </td>
                </tr>

                {/* <tr>
                  <td>Father's Name</td>
                  <td>
                    <strong>{voter?.father_name}</strong>
                  </td>
                  <td>Husband's Name</td>
                  <td>
                    <strong>{voter?.husband_name}</strong>
                  </td>
                </tr> */}

                <tr>
                  <td>District</td>
                  <td>
                    <strong>{voter?.district_data?.name}</strong>
                  </td>
                  <td>Ward Type</td>
                  <td>
                    <strong>{voter?.ward_type}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Ward Name</td>
                  <td>
                    <strong>{voter?.ward_data?.name}</strong>
                  </td>
                  <td>Ward Number</td>
                  <td>
                    <strong>{voter?.ward_number}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Panjayath Union</td>
                  <td>
                    <strong>{voter?.panjayath_data?.name}</strong>
                  </td>
                  <td>Grama Panjayath</td>
                  <td>
                    <strong>{voter?.village_data?.name}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Qualification</td>
                  <td>
                    <strong>{voter?.qualification}</strong>
                  </td>
                  <td>Occupation</td>
                  <td>
                    <strong>{voter?.occupation}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Job Seeker</td>
                  <td>
                    <strong>{voter?.seeking_job}</strong>
                  </td>
                  <td>Taking life-saving meds?</td>
                  <td>
                    <strong>{voter?.medicine_status}</strong>
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
                    <strong>{voter?.minor_male}</strong>
                  </td>
                  <td>Female</td>
                  <td>
                    <strong>{voter?.minor_female}</strong>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Childrens between 14 & 18 years</strong>
                  </td>
                </tr>

                <tr>
                  <td>Male</td>
                  <td>
                    <strong>{voter?.nvoters_male}</strong>
                  </td>
                  <td>Female</td>
                  <td>
                    <strong>{voter?.nvoters_female}</strong>
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
                    <strong>{voter?.govt_emp_male}</strong>
                  </td>
                  <td>Female</td>
                  <td>
                    <strong>{voter?.govt_emp_female}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Religion</td>
                  <td>
                    <strong>{voter?.religion_data?.name}</strong>
                  </td>
                  <td>Community</td>
                  <td>
                    <strong>{voter?.community_data?.name}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Caste</td>
                  <td width="300px">
                    <strong>{voter?.caste_data?.name}</strong>
                  </td>
                  <td>Sub-caste</td>
                  <td width="300px">
                    <strong>{voter?.subcaste_data?.name}</strong>
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
