import React, { useState, useEffect } from 'react';
import {Form,Button,FormControl,Col} from 'react-bootstrap';
import fire from '../../fire';
import classes from './search.module.css';
import { Link } from 'react-router-dom';
 

const Search = (props)=>{

    const [ suggestion,updateSuggestion] = useState([]);
    const [items,updateItem]=useState([]);
    const [category,updateCategory] = useState('All');
    const [value,updateValue]= useState('');

  
    
    useEffect(()=>{
        const item=[...items];
        fire.firestore().collection('products').get().then(snapshot=>snapshot.docs.map(doc=>{
            item.push(doc.data().item);
            updateItem(item);
        }));
    },[])
    useEffect(()=>{
            const item=[];
            if(category=="All"){
                fire.firestore().collection('products').get().then(snapshot=>snapshot.docs.map(doc=>{
                    item.push(doc.data().item);
                    updateItem(item);
                }));     
            }else{
                fire.firestore().collection('products').where('category','==',`${category}`).get().then(snapshot=>snapshot.docs.map(doc=>{
                    item.push(doc.data().item);
                    updateItem(item);
            }));
        }
         
    },[items])
    const autoComplete =()=>{
        const autoSuggestion=suggestion;
        if(autoSuggestion.length==0){
            return null;
        }
        return(
            <ul className={classes.List} >
                {
                    autoSuggestion.map((item,index)=><li onClick={()=>activate(item)} className={classes.Li} key={index}>{item}</li>)
                }
            </ul>
        );
        
    }
    const activate =(item)=>{
        updateValue(item);
        updateSuggestion([]);
    }
    const handleChanged=(event)=>{
        const value=event.target.value;
        updateValue(value);
        let suggestions=[];
        if(value.length>0){
            const regex = new RegExp(`^${value}`,'i');
            suggestions=items.sort().filter(v=>regex.test(v))
        }
        updateSuggestion(suggestions);
    }
    const handleChange = (event)=>{
        const category=event.target.value;
        updateCategory(category);
    }

    return(
        <>
            <Form inline>
                <Form.Row>
                    <Col style={{height:'20px'}}> 
                        <FormControl  type="text" 
                        placeholder="Search" 
                        name="search" 
                        value={value}
                        onChange={handleChanged}
                        autoComplete="off"
                        required/>
                        {autoComplete()}
                    </Col>
                    <Col> 
                        <Form.Control as="select"
                        name="category" 
                        onChange={handleChange} 
                        required>
                            <option>All</option>
                            <option>Properties</option>
                            <option>Vehical</option>
                            <option>Furniture</option>
                            <option>Study Material</option>
                            <option>Electronics</option>
                            <option>Others</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Link to={`searchAd/${category}/${value}`}>
                            <Button 
                            size="md"
                            variant="success">Search
                            </Button>
                        </Link>
                    </Col>
                </Form.Row>
            </Form>   
        </>
    )
}

export default Search;