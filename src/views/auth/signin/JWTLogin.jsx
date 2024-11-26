import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { useState,useContext } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { ConfigContext } from 'contexts/ConfigContext';
import * as actionType from '../../../store/actions';
import { redirect } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const JWTLogin = () => {

  const configContext = useContext(ConfigContext);
  const { isLoggedIn } = configContext.state;
  const { dispatch } = configContext;

  if(secureLocalStorage.getItem("STATUS") != null)
    {
        console.log("Get");
        const data = JSON.parse(secureLocalStorage.getItem("STATUS"));
        if(data.status)
        {
          window.location.replace("/admin/app/dashboard/default/");
        }
    }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      onSubmit={(values ) =>{
        
          const userData = {
            email: values.email,
            password:values.password,
            login_from:"WEB"
          };
          let URL = window.API_URL+"auth/login";
            axios.post(URL,userData)
            .then((response)=>{
              console.log(response);
              console.log(response.data.status, response.data.message);
                if(response.data.status == true)
                {
                  secureLocalStorage.setItem("STATUS",JSON.stringify(response.data));
                  window.location.replace("/admin/app/dashboard/default/");
                     //dispatch({ type: actionType.LOGIN,payLoad:localStorage.getItem("STATUS")});
                }
            });
        }
      }
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              label="Email Address / Username"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                {isSubmitting ? "Please wait..." : "Signin"}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
