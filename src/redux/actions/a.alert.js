import {DEL_ALERT, SET_ALERT} from './ctes';

export function delAlert(){
    return {type: DEL_ALERT, payload: ''}
}

export function setAlert(msg){
    return {type: SET_ALERT, payload: msg}
}
