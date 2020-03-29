import React, { Fragment, useState} from 'react';
import {Navbar,Nav,Dropdown} from 'react-bootstrap';
import classes from './Navbar.module.css'
import { Link } from 'react-router-dom';
import fire from '../../fire';
import UserInfo from '../../container/userInfo/userInfo';
import AdsPlaced from '../adsPlaced/adsPlaced';
import NavBar2 from '../navigationBar2/navBar2';
import Search from '../searchFilter/search';
import AddAdminRole from '../addAdminRole/addAdminRole';
 

function NavBar1(props) {

  const handleLogout = ()=>{
    fire.auth().signOut().catch(err=>console.error(err));
  }
  const [admin,updateAdmin] = useState('false');
  
  fire.auth().onAuthStateChanged(user=>{
    if(user){
      user.getIdTokenResult().then(result=>{
        if(result.claims.admin){
          updateAdmin(`true`);
          document.querySelectorAll('.admin').forEach(i=>i.style.display='block');
        }
      })
      document.querySelectorAll('.logout').forEach(i=>i.style.display='none');
      document.querySelectorAll('.login').forEach(i=>i.style.display='block');
    }else{
      updateAdmin(`false`);
      document.querySelectorAll('.admin').forEach(i=>i.style.display='none');
      document.querySelectorAll('.logout').forEach(i=>i.style.display='block');
      document.querySelectorAll('.login').forEach(i=>i.style.display='none');
    }
})
  return (
    <Fragment>
      <Navbar collapseOnSelect expand="xl"  className={classes.Navbar1} variant="dark" style={{zIndex:'1000'}}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m-auto">
                   <Search />
                </Nav>
                <Nav>
                  <AddAdminRole />
                  <Nav.Link className="logout" style={{display:'none'}}><Link  style={{color:'white',textDecoration:'none'}} to="/login">Login <i className="fas fa-sign-in-alt"></i></Link></Nav.Link>
                  <Nav.Link className="logout" style={{display:'none'}}><Link  style={{color:'white',textDecoration:'none' }} to="/signUp">Register <i className="fas fa-user-plus"></i></Link></Nav.Link>
                  <Nav.Link className='login'  style={{display:'none' }}><Link style={{color:'white',textDecoration:'none'}} to="/createAd"> Post Ad <i className="fas fa-plus"></i></Link></Nav.Link>
                  <Dropdown className="login">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <i className="fas fa-cog"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{left:'-90px'}}>
                    <UserInfo />
                    <AdsPlaced/> 
                    <Dropdown.Item  onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <Button size="md" variant="danger" onClick={handleLogout} className="login" style={{display:'none'}}>Logout</Button> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <NavBar2 admin={admin} />
    </Fragment>
  );
}

export default NavBar1;