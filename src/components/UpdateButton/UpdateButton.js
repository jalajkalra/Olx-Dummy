import React,{useState} from 'react';
import {Button,Form,Modal} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import fire from '../../fire';

const schema = yup.object({
    address: yup.string().required(),
    item: yup.string().required(),
    phonenumber: yup.number().required(),
    price: yup.number().required(),
    description:yup.string().min(30,"Should Be Greater Than 30 character").required(),
  });

function UpdateButton(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return ( 
        <>
        <Button onClick={handleShow}  style={{height:'8vh'}}><i className="fas fa-edit"></i></Button>
        <Modal show={show} onHide={handleClose}> 
            <Formik
                initialValues={{
                    item: props.data.item,
                    address:props.data.address,
                    description:props.data.description,
                    phonenumber:props.data.phonenumber,
                    category:props.data.category,
                    price:props.data.price
                }}
                validationSchema={schema}
                onSubmit={
                    (values,{setSubmitting})=>{
                        setSubmitting(true);
                        fire.firestore().collection('products').doc(props.dataIndex).set({
                            image : props.data.image,
                            item:values.item,
                            address:values.address,
                            description:values.description,
                            phonenumber:values.phonenumber,
                            category:values.category,
                            price:values.price
                        }).then(setShow(!show)).catch(err=>console.log(err))
                                        
                    }       
                }
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    isSubmitting,
                }) => (      
                <Form onSubmit={handleSubmit}> 
                    <center><h2>Update Your Ad</h2></center>     
                    <Form.Group controlId="formGridCategory" style={{marginTop:'2%'}}>
                    <Form.Label>Category</Form.Label> 
                    <Form.Control as="select" value={values.category} onChange={handleChange} name="category" placeholder="category"  required>
                        <option>Properties</option>
                        <option>Vehical</option>
                        <option>Furniture</option>
                        <option>Study Material</option>
                        <option>Electronics</option>
                        <option>Others</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGridItem">
                        <Form.Label>Item</Form.Label>
                        <Form.Control 
                        placeholder=" Item Name " 
                        type="text"
                        name="item"
                        onChange={handleChange}
                        value={values.item}
                        isValid={touched.item && !errors.item}/>
                    </Form.Group>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        placeholder="1234 Main St" 
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={values.address}
                        isInvalid={!!errors.address}/>
                    </Form.Group>
                    <Form.Group controlId="formGridCity" required>
                        <Form.Label>Phone No.</Form.Label>
                        <Form.Control 
                        type="number"
                        name="phonenumber"
                        onChange={handleChange}
                        value={values.phonenumber}
                        isInvalid={!!errors.phonenumber} />
                    </Form.Group>
                    <Form.Group controlId="formGridPrice" required>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3"
                        type="text"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description} />
                    </Form.Group>
                    <Button variant="danger" onClick={handleClose}>
                    Close
                    </Button>
                    <Button  type="submit" disabled={isSubmitting} >
                    Update
                    </Button>
                </Form>
                )}
            </Formik> 
            </Modal>
        </>
    );
 
}

export default UpdateButton;