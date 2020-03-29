import React,{useState,useEffect} from 'react';
import classes from '../chatApp/chatBox.module.css';
import fire from '../../fire';
import olx from '../../assets/olx5.jpg'

const AdminChat = (props)=>{
  const [messages,updateMessages] = useState([]);
  const [message,updatemessage] = useState("");

  const handleMessage = (e)=>{
      updatemessage(e.target.value);
  }
  
  useEffect(()=>{
    fire.database().ref(`message/${props.uid}`).on('value',snapshot=>{
        let newMessage=[...messages];
          for(let i in snapshot.val()){  
            newMessage.push(snapshot.val()[i]);
            updateMessages([...newMessage]);
        }
    })
  },[])
  useEffect(()=>{
    fire.database().ref(`message/${props.uid}`).on('value',snapshot=>{
        let newMessage=[];
          for(let i in snapshot.val()){  
            newMessage.push(snapshot.val()[i]);
            updateMessages([...newMessage]);
          }
        })
  },[props])
   
  const handleSubmit = ()=>{
    fire.database().ref(`message/${props.uid}`).push({message:message,user:"admin"})
    updatemessage(""); 
  }
  return (
    <>
      <div style={{width:'100%',background:'turquoise',padding:1.5}}><center><img src={olx} alt="OLX" className={classes.Logo}></img></center></div>
      <div className={classes.ChatBox}>
          <Display messages={messages}/>
      </div>
      <input type="text" placeholder="Enter Your Message" onChange={handleMessage} value={message} className={classes.Input}/>
      <button onClick={handleSubmit} className={classes.Button}>Send</button>
    </>
  );
}
const Display = (props)=>{
    return(
        <>
            {
                props.messages.length>0?props.messages.map((list,index)=>(
                    list.user=="user"?<p key={index} className={classes.Direction}><span style={{color:'white',background:'gray'}} className={classes.Span}>{list.message}</span></p>:
                    <p key={index}><span style={{color:'white',background:'lightGray'}} className={classes.Span}>{list.message}</span></p>
                )):<h3>No Data Found...</h3>
            }
        </>
    )
}

export default AdminChat;