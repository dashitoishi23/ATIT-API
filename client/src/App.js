import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import AllocList from './components/Alloc'
import Header from './components/layout/Header'
import MeritList from './components/MeritList'
import UploadTerm from './components/UploadTerm'
import Upload from './components/Upload'
import Sliding from './components/SlidingList'
import UpdateSeats from './components/UpdateSeats'

class App extends Component{
  render(){
    return(
      <div className='App'>
      <Router>
      <Header />
      <Route exact path="/" component={Upload} />
      <Route exact path ="/uploadTerm" component = {UploadTerm} />
      <Route exact path="/alloc" component={AllocList} />
      <Route exact path="/merit" component={MeritList} />
      <Route exact path="/slide" component={Sliding} />
      <Route exact path="/updSeats" component={UpdateSeats} />
      </Router>
      </div>
    )
  }
}

export default App;