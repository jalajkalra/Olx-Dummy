import React, { Fragment,useEffect,useState} from 'react';
import {Row,Col,Card, Container} from 'react-bootstrap';
import fire from '../../fire';
import {User} from '../../entities/home/action';
import {useDispatch,useSelector} from 'react-redux';
import classes from './Body.module.css';
import Filter from '../../container/filter/filter';
import RadioFilter from'../../container/filter/radioFilter';
import {Link} from 'react-router-dom';

function Body(props) {
    const [data,updateData] = useState([]);
    const [shown,updateShown]=useState([]);
    const [Filters,setFilters]=useState({
        category:[],
        price:''
      })
      const handleFilter = (filter,category)=>{
          if(category=='category'){
            const newFilter = {...Filters};
            newFilter[category]=filter;
            setFilters(newFilter); 
          }else{
            const newFilter = {...Filters};
            newFilter[category]=`${filter}`;
            setFilters(newFilter);
          }
           
      }
    
    const dispatch=useDispatch();
    
    useEffect(()=>{
        fire.firestore().collection('products').get().then(snapshot=>{ 
            updateData(snapshot.docs)
            updateShown(snapshot.docs)
        })  
    },[])
    useEffect(()=>{
        dispatch(User(data))
    },[data,dispatch])

    const randomUser = useSelector(state=>state.user.data)

    useEffect(()=>{
        if(Filters['category'].length>0&&Filters['price'].length>0){
            const dummy=[];
            randomUser.map(item=>{
                if(Filters['category'].indexOf(item.data().category)!=-1){
                    if(item.data().price<=Number(Filters.price.split("-")[1])&&item.data().price>=Number(Filters.price.split("-")[0])){
                        dummy.push(item)
                    }
                }
                updateShown(dummy)
            }) 
        }
        else if(Filters['category'].length>0){
            const dummy=[];
            randomUser.map(item=>{
                if(Filters['category'].indexOf(item.data().category)!=-1){
                    dummy.push(item)  
                }
                updateShown(dummy)
            })
    }
        else if(Filters['price'].length>0){
            const dummy=[];
            randomUser.map(item=>{
                if(item.data().price<=Number(Filters.price.split("-")[1])&&item.data().price>=Number(Filters.price.split("-")[0])){
                    dummy.push(item)
                }
                updateShown(dummy)
            })
        }
        else{
            const dummy=[];
            randomUser.map(item=>{
                dummy.push(item)
                 
            })
            updateShown(dummy)
    }
    },[Filters]) 
    return (
        <>
            <Row style={{margin:'1%'}}>
                <Col md={6}><Filter handleFilter={(filter)=>handleFilter(filter,'category')}/></Col>
                <Col md={6}><RadioFilter handleFilter={(filter)=>handleFilter(filter,'price')}/></Col>
            </Row>
            <Row className={classes.Row}> 
                {  
                    shown.length>0?shown.map((list,index)=>(
                        <Col xl={3} lg={4} sm={6} xs={12} key={index} >
                            <Link to={`searchAd/${list.data().category}/${list.data().item}`} style={{color:'black',textDecoration:'none'}}>
                            <Card className={classes.Card}>
                                <Card.Img variant="top" src= {list.data().image}  className={classes.Img}/>
                                <Card.Body>
                                    <Card.Title>{list.data().item}</Card.Title>
                                    <Card.Text>
                                            {`Rs ${list.data().price}`}
                                    </Card.Text>   
                                </Card.Body>
                            </Card>
                            </Link>
                        </Col>
                    )):<h2 style={{letterSpacing:2,fontSize:'5rem',margin:'20vh'}}>NO Data Found</h2>
                }
            </Row>
        </>
    );
}

export default Body;