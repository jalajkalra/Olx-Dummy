import React, { Fragment } from 'react';
import classes from '../navigationBar/Navbar.module.css';
import {Nav,Navbar,Button} from 'react-bootstrap';
import olx from '../../assets/olx5.jpg';
import {Link} from 'react-router-dom';
import ChatApp from '../chatApp/chatApp';
 

function Navbar2(props) {
  const category=["Properties","Vehical","Furniture","Study Material","Electronics","Others"];
  return (
    <Fragment>
        <Navbar collapseOnSelect expand="xl" bg="white" variant="light" className={classes.Navbar2}>
          <img className={classes.Logo} src={olx} alt="Logo"></img>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {
                category.map(categories=><Nav.Link href={`searchAd/${categories}`}>{categories}</Nav.Link>)
              }
            </Nav>
            <Nav>
              {  
                props.admin==="true"?<Link to={`/adminChat`}><Button size="lg" variant="warning" style={{marginRight:'1vw'}}>Open Chat</Button></Link>:
                <ChatApp />
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </Fragment>
  );
}

export default Navbar2;