import React  from 'react';
import {Form,Button,Row,Col,InputGroup } from 'react-bootstrap';
import classes from './signUp.module.css';
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
    .required("Must Be An Password"),
    username:Yup.string()
    .required("Must Be A Username"),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phone: Yup.number().required(),
})

function SignUp(props) { 
    
  return (
    <div style={{backgroundImage:`url(${olxBack})`}}>
        <div className={classes.Box} style={{bottom: '-3%'}}>
            <Row>
                <Col xl={12} md={12} >
                    <h2 style={{display:'flex',justifyContent:'center'}}>Sign Up</h2>
                    <hr style={{marginBottom:'70px'}}/>
                    <Formik 
                    initialValues={{ email: '', password: '' }} 
                    validationSchema={validationSchema}
                    onSubmit={
                        (values,{setSubmitting})=>{
                            setSubmitting(true);
                            fire.auth().createUserWithEmailAndPassword(values.email,values.password).then(cred=>{
                                return fire.firestore().collection(`userInfo`).doc(cred.user.uid).set({
                                    firstName:values.firstName,
                                    lastName:values.lastName,
                                    username:values.username,
                                    phone:values.phone,
                                    dob:values.dob
                                })
                            }).then(props.history.push('/')).catch(err=>console.log(err))
                             
                        }
                    }>
                        {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting})=>(
                            <Form onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        isValid={touched.firstName && !errors.firstName}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationFormik02">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        isValid={touched.lastName && !errors.lastName}
                                    />

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        aria-describedby="inputGroupPrepend"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        isInvalid={!!errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                    name="email"
                                    type="email" 
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={touched.email && errors.email ? "has-error":null}/> 
                                    <Form.Text className="text-muted" style={{color:'red'}}>
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
                                </Form.Group>
                                <Form.Text className="text-muted" style={{color:'red'}}>
                                    {errors.password && touched.password && errors.password}
                                </Form.Text>
                                <Form.Group controlId="formBasicPhonenumber">
                                    <Form.Label>Contact Info</Form.Label>
                                    <Form.Control 
                                    name="phone"
                                    type="number" 
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    required />
                                </Form.Group>
                                <Form.Group controlId="formBasicDob">
                                    <Form.Label>D.O.B</Form.Label>
                                    <Form.Control 
                                    name="dob"
                                    type="date" 
                                    placeholder="Date Of Birth"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dob}
                                    required />
                                </Form.Group>
                                <Button 
                                size="lg" 
                                variant="primary" 
                                type="submit" 
                                style={{margin:'5% 0'}}
                                disabled={isSubmitting}
                                >
                                Submit
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
     
      
  );
}

export default SignUp;