import React,{useState} from 'react';
import {Modal,Dropdown,Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const  UserInfo = (props)=> {
    const [show, setShow] = useState(false);

    const information = useSelector(state=>state.user.userInfo);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <> 
            <Dropdown.Item onClick={handleShow}>Account</Dropdown.Item> 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>User Informtion</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin:'0px auto'}}>
                    <p><strong>First Name : </strong>{information.firstName}</p>
                    <p><strong>Last Name : </strong>{information.lastName}</p>
                    <p><strong>Username : </strong>{information.username}</p>
                    <p><strong>PhoneNumber : </strong>{information.phone}</p>
                    <p><strong>Date Of Birth : </strong>{information.dob}</p>
                    {
                        information.admin=="true"?<p style={{color:'red',display:'flex',justifyContent:'center'}}>Admin</p>:<p></p>
                    }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserInfo;