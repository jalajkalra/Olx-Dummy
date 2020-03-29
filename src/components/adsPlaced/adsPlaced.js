import React,{useState, useEffect}  from 'react';
import {Modal,Button,Dropdown,Row,Col,Card} from 'react-bootstrap';
import fire from '../../fire';
import UpdateButton from '../UpdateButton/UpdateButton';


function AdsPlaced() {

    const [show, setShow] = useState(false);
    const [id,updateId] = useState([]);
    const [data,updateData]= useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(()=>{
        fire.auth().onAuthStateChanged(user=>{
            if(user){
                const dataFiles=[...data];
                const ids=[...id];
                fire.firestore().collection(`products`).where('uid','==',`${user.uid}`).get().then(snapshot=>snapshot.docs.map(doc=>{
                    ids.push(doc.id)
                    updateId(ids)
                    dataFiles.push(doc.data())
                    updateData(dataFiles)
                }
                    ))
            } 
        })
    },[])
    
    const deleteHandler = (id)=>{
        fire.firestore().collection('products').doc(id).delete().then(()=>handleClose).catch(err=>console.log(err))
    }
    
    
    return (
        <>
            <Dropdown.Item onClick={handleShow}>Your Ads</Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Your Ads</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{display:'flex',justifyContent:'center'}}> 
                        {
                            data.length>0?data.map((list,index)=>(
                                <div  key={index}>
                                    <Col md={6} sm={12} xs={12} > 
                                        <Card style={{ width: '16rem',margin:'2%'}}>
                                            <Card.Img variant="top" src= {list.image} style={{width:'100%',height:'300px'}}/>
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={7}>
                                                        <Card.Title>{list.item}</Card.Title>
                                                        <Card.Text>
                                                            {`Rs ${list.price}`} 
                                                        </Card.Text>
                                                    </Col>
                                                    <Col xs={5} style={{display:'flex',direction:'row'}}>
                                                        <Button variant="danger" onClick={()=>deleteHandler(id[index])} style={{height:'8vh'}}><i className="fas fa-trash-alt"></i></Button>
                                                        <UpdateButton data={list} dataIndex={id[index]}/> 
                                                    </Col>    
                                                </Row>   
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </div>
                            )):<h2>No Data Found...</h2>
                        }
                    </Row>
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

export default AdsPlaced;