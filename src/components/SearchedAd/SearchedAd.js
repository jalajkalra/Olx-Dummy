import React, { useEffect, useState } from "react";
import fire from "../../fire";
import {Row,Col} from 'react-bootstrap';
import OtherPageNav from '../OtherNav/OtherPageNav';
import CustomFooter from '../Footer/Footer';
import classes from "./searched.module.css";

const SearchAd = (props)=>{
    const[data,updateData]=useState({})

    useEffect(()=>{
        if(props.match.params.category==="All"){
            fire.firestore().collection('products').where('item','==',`${props.match.params.item}`).get().then(snapshot=>snapshot.docs.map(doc=>updateData(doc.data())))
        }else{
            fire.firestore().collection('products').where('category','==',`${props.match.params.category}`).where('item','==',`${props.match.params.item}`).get().then(snapshot=>snapshot.docs.map(doc=>updateData(doc.data())))
        }
    },[])
    const details=()=>{
        if(Object.keys(data).length>0){
            return (
                    <Row> 
                        <Col md={4} xs={12} style={{marginTop:"2%"}} className={classes.Col}>
                            <img src={data.image} alt="Photo" className={classes.Img}></img>
                        </Col>
                        <Col md={8} xs={12} style={{marginTop:"2%",paddingLeft:'15%',lineHeight:'2rem',letterSpacing:1,fontSize:'1.2rem'}}>
                            <h2 style={{letterSpacing:2,fontSize:'4rem'}} >{data.item}</h2>
                            <p><strong>Category: </strong>{data.category}</p>
                            <p><strong>Price: </strong>{data.price}</p>
                            <p><strong>Description: </strong>{data.description}</p>
                            <p><strong>Contact: </strong>{data.phonenumber}</p> 
                        </Col>
                    </Row>
                    )
        }else{
            return(<h2 style={{letterSpacing:2,fontSize:'5rem',margin:'20vh'}}>NO Such Data Found</h2>)
        }
    }
    return(
        <>
            <OtherPageNav />
             {details()}
            <CustomFooter/>     
        </>
    )
}
export default SearchAd;