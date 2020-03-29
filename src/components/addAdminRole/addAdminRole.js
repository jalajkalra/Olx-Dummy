import React,{useState} from 'react';
import {Nav, Form, Modal, Button} from 'react-bootstrap';
import fire from '../../fire';

function AddAdminRole() {
  const [show, setShow] = useState(false);
  const [value,updateValue] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event)=>{
    updateValue(event.target.value);
  }
  const handleSubmit = ()=>{
    const addAdminRole = fire.functions().httpsCallable('addAdminRole');
    addAdminRole({email:value}).then(result=>console.log(result)).then(handleClose);
  }

  return (
    <>
      <Nav.Link className="admin" onClick={handleShow} style={{color:'white',borderRight:'1px solid white',display:'none'}}>Add Admin</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Form> 
          <Modal.Header closeButton>
            <Modal.Title>
               Add Admin
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formGroupEmail">
              <Form.Control type="email" placeholder="Enter email" onChange={handleChange} style={{border:'none',borderBottom:'1px solid black'}} required/>
            </Form.Group>
            <div style={{display:'flex',justifyContent:'center'}}>
              <Button size="lg" variant="secondary" onClick={handleClose} style={{margin:2}}>
                Close
              </Button>
              <Button size="lg" variant="primary" onClick={handleSubmit} style={{margin:2}}>
                Add
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}

export default AddAdminRole;
