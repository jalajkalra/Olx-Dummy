import React,{useState,useEffect} from 'react';
import classes from './chatBox.module.css';
import {Modal,Button} from 'react-bootstrap';
import fire from '../../fire';
import {useSelector,useDispatch} from 'react-redux'
import {userUid} from '../../entities/home2/action';
import olx from '../../assets/olx5.jpg'

const ChatApp = (props)=>{
  const [messages,updateMessages] = useState([]);
  const [message,updatemessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMessage = (e)=>{
      updatemessage(e.target.value);
  }
  const dispatch=useDispatch();
  const uid = useSelector(state=>state.uid.uid);
  useEffect(()=>{
    fire.auth().onAuthStateChanged(user=>{
      if(user){
        dispatch(userUid(user.uid))
        fire.database().ref(`message/${user.uid}`).on('value',snapshot=>{
          let newMessage=[...messages];
            for(let i in snapshot.val()){  
              newMessage.push(snapshot.val()[i]);
              updateMessages([...newMessage]);
            }
        })
      }else{
        updateMessages([]);
      }
    })
  },[])
   
  const handleSubmit = ()=>{
    fire.database().ref(`message/${uid}`).push({message:message,user:'user'})
    updatemessage(""); 
  }
  return (
    <>
          <Button size="lg" variant="warning" style={{marginRight:'1vw'}} onClick={handleShow}>Chat With Us</Button> 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Chat With Us</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin:'0', padding:0}}>
                  <div style={{width:'100%',background:'lightGray',padding:1.5}}><center><img src={olx} alt="OLX" className={classes.Logo}></img></center></div>
                  <div className={classes.ChatBoxUser}>
                    <Display messages={messages}/>
                  </div>
                  <input type="text" placeholder="Enter Your Message" onChange={handleMessage} value={message} style={{padding:10,width:'80%'}}/>
                  <button onClick={handleSubmit} style={{padding:'10px',width:'20%'}}>Send</button>
                </Modal.Body>
            </Modal>       
    </>
  );
}
const Display = (props)=>{
    return(
        <>
            {
                props.messages.length>0?props.messages.map((list,index)=>(
                  list.user==="user"?<p key={index} className={classes.Direction}><span style={{color:'white',background:'gray'}} className={classes.Span}>{list.message}</span></p>:
                    <p key={index}><span style={{color:'white',background:'lightGray'}} className={classes.Span}>{list.message}</span></p>
                )):<h3>No Data Found...</h3>
            }
        </>
    )
}

export default ChatApp;