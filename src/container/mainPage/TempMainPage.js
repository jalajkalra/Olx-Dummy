import React, { Fragment} from 'react';
import NavBar1 from '../../components/navigationBar/navigationBar';
import Carousel from '../../components/carousel/carousel';
import Body from '../mainPageBody/body';
import CustomFooter from '../../components/Footer/Footer'; 
import fire from '../../fire';
import {UserInfo} from '../../entities/home/action';
import {useDispatch} from 'react-redux';
import { userAdmin } from '../../entities/home2/action';
 

function App() {
  const dispatch=useDispatch();
//when i user updateData(doc.data) it keeps re-rendering again and again even though authentication state is not changed
  fire.auth().onAuthStateChanged(user=>{
    if(user){
      user.getIdTokenResult().then(result=>{
        user.admin=result.claims.admin;
        dispatch(userAdmin(`${user.admin}`))
        let userInfo={};
        fire.firestore().collection(`userInfo`).doc(user.uid).get().then(doc=>{
          userInfo={...doc.data(),admin:`${user.admin}`}
          dispatch(UserInfo(userInfo))
            })
      })
    }else{
        dispatch(userAdmin(`false`));
    }
})

  return (
    <div style={{margin:0}}>
        {/* navbar */}
        <NavBar1/>
        {/* Carousel */}
        <Carousel/>
        {/* Body  */}
        <Body/>
        <CustomFooter />
        {/* {
          fire.auth().onAuthStateChanged(user=>user?<div>
            <Row style={{margin:'1%'}}>
              <Col md={6}><Filter handleFilter={(filter)=>handleFilter(filter,'category')}/></Col>
              <Col md={6}><RadioFilter /></Col>
            </Row>
            <Body />
          </div>:<h2>Login To view And Post Ads</h2>)
        } */}
    </div>
  );
}

export default App;