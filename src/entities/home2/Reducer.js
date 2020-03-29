 import * as actionType from '../actionType';

 const INIT_STATE = {
    uid:'',
    admin:''
 }

 const uidReducer = (state=INIT_STATE,action)=>{
    switch(action.type){
        case actionType.USER_UID:
            return {...state,uid:action.payload}
        case actionType.USER_UID:
            return {...state,admin:action.payload}          
        default:
            return state;    

    }
}

 export default uidReducer;