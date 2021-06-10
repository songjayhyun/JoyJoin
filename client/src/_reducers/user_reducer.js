import { startSession } from 'mongoose';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_FRIEND_USER,
    GET_FRIEND_ITEMS_USER,
    REMOVE_FRIEND_ITEM_USER,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
         case ADD_TO_FRIEND_USER:
            return {...state,
                    useData : {
                        ...state.userData,
                        cart : action.payload   
                    } }
        default:
            return state;
    }
}