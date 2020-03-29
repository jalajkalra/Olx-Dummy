import React,{Fragment} from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./footer.module.css";

const CustomFooter = (props)=>{
        return(
        <Fragment>
            <div style={{background:"#010c1f",padding:0}} className={classes.Length}>
                <Row className={classes.Footer}>
                    <Col xs={4} className={classes.Col}>
                        <h4 style={{color: "#555"}}>Address :</h4>
                        <p className={classes.P}>Flipkart Internet Private Limited, </p>
                        <p className={classes.P}>Flipkart Internet Private Limited, </p>
                        <p className={classes.P}> Karnataka, India </p>
                        <p className={classes.P}> CIN : U51109KA201 </p>
                        <p className={classes.P}> Telephone: <a href="tel:18002089898">1800 208 9898</a></p>
                    </Col>
                    <Col xs={4} className={classes.Col}>
                        <h4 style={{color: "#555"}}>Mail Us :</h4>
                        <p className={classes.P}>Flipkart Internet Private Limited, </p>
                        <p className={classes.P}> Buildings Alyssa, Begonia &amp; </p>
                        <p className={classes.P}> Clove Embassy Tech Village, </p>
                        <p className={classes.P}> Karnataka, India </p>
                    </Col>
                    <Col xs={4} style={{paddingTop:"3%"}}>
                        <center>
                            <h4  style={{color:"#555"}}>Social :</h4>
                            <img src="http://pluspng.com/img-png/instagram-png-instagram-png-logo-1455.png" alt="" className={classes.Social}></img>
                            <img src="http://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19748.png" alt="" className={classes.Social}></img>
                            <img src="http://pngimg.com/uploads/twitter/twitter_PNG32.png" alt="" className={classes.Social}></img>
                        </center>
                    </Col>
                </Row>
            </div>  
        </Fragment>
        );
}
export default CustomFooter;