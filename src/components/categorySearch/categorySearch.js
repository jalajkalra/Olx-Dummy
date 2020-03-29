import React, { useEffect, useState } from "react";
import fire from "../../fire";
import {Row,Col,Card} from 'react-bootstrap';
import OtherPageNav from '../OtherNav/OtherPageNav';
import CustomFooter from '../Footer/Footer';
import classes from '../../container/mainPageBody/Body.module.css';
import { Link } from "react-router-dom";


const CategorySearch = (props)=>{
    const[data,updateData]=useState([])
   
    useEffect(()=>{
            fire.firestore().collection('products').where('category','==',`${props.match.params.category}`).get().then(snapshot=>updateData(snapshot.docs))
    },[])
     
    return(
        <>
            <OtherPageNav />
            <Row className={classes.Row}> 
                {     
                        data.length>0?data.map((list,index)=>{
                                if(list.data().category===props.match.params.category){
                                    return(
                                        <Col xl={3} lg={4} sm={6} xs={12} key={index}>
                                        <Link to={`./${props.match.params.category}/${list.data().item}`} style={{color:'black',textDecoration:'none'}}>
                                            <Card className={classes.Card}>
                                                <Card.Img variant="top" src={list.data().image}  className={classes.Img}/>
                                                <Card.Body>
                                                    <Card.Title>{list.data().item}</Card.Title>
                                                    <Card.Text>
                                                        {`Rs ${list.data().price}`}
                                                    </Card.Text>   
                                                </Card.Body>
                                            </Card>
                                        </Link>    
                                    </Col>
                                    ) 
                                }
                        }
                        ):<h2 style={{letterSpacing:2,fontSize:'5rem',margin:'20vh'}}>NO Data Found</h2>
                }
            </Row>
            <CustomFooter/>     
        </>
    )
}
export default CategorySearch;