import * as actionType from '../actionType';

const INIT_STATE = {
    data:[],
    userInfo:{}
}

const reducer = (state=INIT_STATE,action)=>{
    switch(action.type){
        case actionType.USER_SUCCESS:
            return {...state,data:action.payload}
        case actionType.USER_INFO:
            return {...state,userInfo:action.userInfo}    
        default:
            return state    
    }
}

export default reducer;