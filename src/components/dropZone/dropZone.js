import React, {useState} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

const DropzoneAreaExample = (props)=>{
const [files,updateFies]=useState([]);
 
const  handleChange=(files)=>{
     updateFies(files);
  }
    return (
      <DropzoneArea 
        onChange={()=>handleChange(files)}
        />
    )  
} 

export default DropzoneAreaExample;