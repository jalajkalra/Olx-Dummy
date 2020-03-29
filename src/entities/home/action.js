import { USER_SUCCESS,USER_INFO } from '../actionType'

export const User = (data)=>{
    return (dispatch)=>{
        dispatch({
            type:USER_SUCCESS,
            payload:data
        })
    }
} 

export const UserInfo = (data)=>{
    return(dispatch)=>{
        dispatch({
            type:USER_INFO,
            userInfo:data
        })
    }
}

