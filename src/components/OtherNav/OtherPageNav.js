import React from 'react';
import {Navbar,Button,Nav} from 'react-bootstrap';
import olx from '../../assets/olx5.jpg';
import {Link} from 'react-router-dom';

function OtherPageNav(props) {
  
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Navbar.Brand>
            <img
            src={olx}
            width="90"
            height="70"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            style={{borderRadius:25}}
            />
            </Navbar.Brand>
          </Nav>
          <Nav>
            <Link to="/"><Button><i className="fas fa-chevron-left"></i>{' '}Go Back</Button></Link>
          </Nav>
      </Navbar>
    </>
  );
}

export default OtherPageNav;