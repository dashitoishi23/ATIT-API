import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

import {SET_CURRENT_USER,GET_ERRORS} from './types'


export const custLogin = (userData) => dispatch => {
 axios.post('/api/users/login',userData)
 .then(res=>{
    const { token } = res.data
    const { userName } = res.data
    localStorage.setItem('loginJwt',token)
    localStorage.setItem('sessionUser',userName)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))

 })
 .catch(err=>{
     console.log(err)
     dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
 })
};


export const setCurrentUser = decoded =>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}