import {USER_UID,USER_ADMIN} from '../actionType';

export const userUid = (uid)=>{
    return dispatch =>{
        dispatch({
            type:USER_UID,
            payload:uid
        })
    }
}
export const userAdmin = (value)=>{
    return dispatch =>{
        dispatch({
            type:USER_ADMIN,
            payload:value
        })
    }
}

 
 
