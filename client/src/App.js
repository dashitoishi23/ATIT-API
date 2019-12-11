import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
import './App.css';
import AllocList from './components/Alloc'
import store from './store'
import Header from './components/layout/Header'
import MeritList from './components/MeritList'
import UploadTerm from './components/UploadTerm'
import Upload from './components/Upload'
import Sliding from './components/SlidingList'
import UpdateSeats from './components/UpdateSeats'
import Login from './components/Login'

if(localStorage.loginJwt){
  setAuthToken(localStorage.loginJwt)
  const decoded = jwt_decode(localStorage.loginJwt)
  store.dispatch(setCurrentUser(decoded))
}

class App extends Component{
  render(){
    return(
      <Provider store={store}>
      <div className='App'>
      <Router>
      <Header />
      <Route exact path="/" component={Login} />
      <Route exact path="/upl" component={Upload} />
      <Route exact path ="/uploadTerm" component = {UploadTerm} />
      <Route exact path="/alloc" component={AllocList} />
      <Route exact path="/merit" component={MeritList} />
      <Route exact path="/slide" component={Sliding} />
      <Route exact path="/updSeats" component={UpdateSeats} />
      </Router>
      </div>
      </Provider>
    )
  }
}

export default App;