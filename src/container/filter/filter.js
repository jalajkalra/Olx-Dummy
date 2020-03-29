import React, { Fragment,useState,useEffect } from 'react';
import classes from './filter.module.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkbox } from '@material-ui/core';

const category = [
    {id:1,type:'Properties'},
    {id:2,type:'Vehical'},
    {id:3,type:'Furniture'},
    {id:4,type:'Study Material'},
    {id:5,type:'Electronics'},
    {id:6,type:'Others'}
]


function Filter(props) {
  
  const [check,updateCheck]=useState([]);
  

  const checkHandler = (value)=>{
      const isThere=check.indexOf(value);
      const newChecked=[...check];
      if(isThere===-1){
          newChecked.push(value);
      }else{
          newChecked.splice(isThere,1);
      }
      updateCheck(newChecked);
  }
  useEffect(()=>{
    props.handleFilter(check);
  },[check])
  return (
    <div className={classes.Root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Category</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography>
                {   
                    category.map((type,index)=>(
                    <Fragment key={index}>
                    <Checkbox 
                    checked= {check.indexOf(type.type)===-1 ? false : true}
                    type="checkbox" 
                    onChange={()=>checkHandler(type.type)}/>
                    <span>{type.type}</span>
                    </Fragment>  
                    ))
                }
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default Filter;