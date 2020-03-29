import React, { Fragment,useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const price = [
    {id:0,type:'0-100000000',showType:'All'},
    {id:1,type:'1-999',showType:'1-999'},
    {id:2,type:'1000-4999',showType:'1000-4999'},
    {id:3,type:'5000-9999',showType:'5000-9999'},
    {id:4,type:'10000-14999',showType:'10000-14999'},
    {id:5,type:'15000-100000000',showType:'15000-Above'}
]


function Filter(props) {
  
  const [value,setValue]=useState([]);
  

  const handleChange = (event)=>{
    setValue(event.target.value);
  }
  useEffect(()=>{
    props.handleFilter(value)
  },[value])

  return (
    <div style={{width:'100%'}}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Price</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography>
                <RadioGroup value={value} onChange={handleChange} row> 
                {   
                    price.map((type,index)=>(
                    <Fragment key={index}>
                        <FormControlLabel
                            value={`${type.type}`}
                            control={<Radio color="primary" />}
                            label={type.showType}
                            labelPlacement="end"
                        /> 
                    </Fragment>  
                    ))
                }
                </RadioGroup>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default Filter;