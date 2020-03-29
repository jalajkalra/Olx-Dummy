import React  from 'react';
import {Form,Button,Row,Col } from 'react-bootstrap';
import classes from '../signUp/signUp.module.css';
import Olx from '../../assets/olx4.jpg';
import olxBack from '../../assets/olx5.png'; 
import {Formik} from 'formik';
import * as Yup from 'yup';
import fire from '../../fire';

const validationSchema=Yup.object().shape({
    email:Yup.string()
    .max(255,"Must Be Shorter Than 255")
    .email("Must Be a Valid Email Request")
    .required("Must Be An Email"),
    password:Yup.string()
    .min(8,"Must Be Greater Than 8 Character")
    .required("Must Be An Password")
})

function Login(props) { 
    
  return (
    <>
    <div style={{backgroundImage:`url(${olxBack})`,height:'100vh'}}>
        <div className={classes.Box} style={{bottom: '-20%'}}>
            <Row>
                <Col xl={6} md={12}>
                    <img src={Olx} alt="Olx LoginPage" style={{margin:'auto'}} className={classes.Img}></img>
                </Col>
                <Col xl={6} md={12} style={{paddingRight:'5%'}}>
                    <h2 style={{margin:'2vh 8vw 8vh 8vw'}}>Sign In</h2>
                    <Formik 
                    initialValues={{ email: '', password: '' }} 
                    validationSchema={validationSchema}
                    onSubmit={
                        (values,{setSubmitting,resetForm})=>{
                            setSubmitting(true);
                            fire.auth().signInWithEmailAndPassword(values.email,values.password)
                            .then(resetForm())
                            .then(props.history.push('/'))
                            .catch(err=>{
                                console.error(err);
                            }) 
                        }
                    }>
                        {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting})=>(
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                    name="email"
                                    type="email" 
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={touched.email && errors.name ? "has-error":null}/> 
                                    <Form.Text className="text-muted">
                                    {errors.email && touched.email && errors.email}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    name="password"
                                    type="password" 
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className={touched.email && errors.name ? "has-error":null} />
                                    <Form.Text className="text-muted">
                                    {errors.password && touched.password && errors.password}
                                    </Form.Text>
                                </Form.Group>
                                <Button 
                                size="lg" 
                                variant="primary" 
                                type="submit" 
                                style={{margin:'5% 0'}}
                                disabled={isSubmitting}
                                >
                                Login
                                </Button>
                                <Button 
                                size="lg" 
                                variant="danger"  
                                style={{margin:'5% 2%'}}
                                onClick={()=>props.history.push('/')}
                                >
                                Cancel
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </div>
    </div>  
    </> 
      
  );
}

export default Login;