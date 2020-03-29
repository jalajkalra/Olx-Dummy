import React, { useEffect, useState } from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import classes from './adminChat.module.css';
import fire from '../../fire';
import Admin from '../../assets/admin.jpg';
import AdminChat from '../../components/adminChat/adminChat';
 

const AdminChatPage = (props)=>{
    const [id,updateId] = useState([])
    const [uid,updateUid]= useState('');
    useEffect(()=>{
        fire.firestore().collection('userInfo').get().then(snapshot=>updateId(snapshot.docs) 
        )
    },[])
    const idHandler=(value)=>{
        updateUid(value)
    } 
    return(
        <>
            <Row style={{padding:0,margin:0}}>
                <Col md={4}  xs={4} className={classes.Col1}>
                    <div className={classes.AdminChat}>
                        <img src={Admin} alt="" className={classes.Admin}/> 
                        <Button style={{float:'right',margin:'1%'}} onClick={()=>props.history.goBack()}>{'  '}<i className="fas fa-chevron-left"></i>{'  '}</Button>
                    </div>
                    <ul style={{padding:0}}>
                        {    
                            id.length>0?id.map((item,key)=><li key={key} onClick={()=>idHandler(item.id)} className={classes.Li}>{item.id}</li>):<p>No User</p>
                        } 
                    </ul> 
                </Col>
                <Col md={8} xs={8} className={classes.Col2}>
                    <AdminChat uid={uid} />
                </Col>
            </Row>
        </>
    )
}
export default AdminChatPage;