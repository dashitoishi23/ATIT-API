import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../styles/allocList.css'
import axios from 'axios'

export default class UpdateSeats extends Component{
    constructor(){
        super()
        this.state={
            deptName: 'CSE',
            deptSeats: 0,
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onClick(){
      localStorage.removeItem('sessionUser')
      localStorage.removeItem('loginJwt')
      this.props.history.push('/')
    }
    componentDidMount(){
      if(localStorage.length===0){
          this.props.history.push('/')
      }
  }
    onSubmit(e){
        e.preventDefault()
        let bod = {
            ...this.state
        }
        axios.put('/api/dept/changeSeats',bod)
        .then(res=>{
            this.props.history.push('/merit')
        })
        .catch(err=>console.log(err))

    }
    render(){
      let show = (
        <div className="container-fluid">
                  <div className='container'>
    <nav className="navbar bg-primary navbar-dark py-md-0" id='sidebar'>
      <Link className="navbar-brand" to="/">Home</Link>
      <Link   className="navbar-brand" to="/alloc" style={{marginRight:"2%"}}>Update Seats</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span className="navbar-toggler-icon"></span>
      </button>
    <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to="/upl">Upload</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/uploadTerm">Upload Fee Details</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/merit">Merit List</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/alloc">Allocation List</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/slide">Sliding Up List</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/updSeats">Update Seats</Link>
            </li>

      </ul> 
    </div> 
    </nav>
  </div>
  <div className="card-footer">
  <div className="row">
  <div className="col-sm-3"></div>
  <div className="col-sm-6 text-center"><strong>Edit Total Seats</strong>
  <br /><hr />
  <form onSubmit={this.onSubmit}>
  <select name="deptName" className="custom-select mb-3"  onChange={this.onChange} 
  value={this.state.deptName}>
      <option value="CSE" >CSE</option>
      <option value="EEE">EEE</option>
      <option value="ECE">ECE</option>
      <option value="ME">MEC</option>
      <option value="Civil">CIVIL</option>
    </select>
    <input type='number' name='deptSeats' required onChange={this.onChange}/>
    <button type="Submit" className="btn btn-outline-primary">Edit</button>
    </form>
  </div>
  </div>
  </div>
  <button onClick={this.onClick}>LOG OUT</button>
  </div>
  )
  return show
      }
    }