import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../styles/allocList.css'
import axios from 'axios'

export default class MeritList extends Component{
    constructor(){
        super()
        this.state={
            allocList: [],
            seats: []
        }
        this.onClick = this.onClick.bind(this)
    }
    onClick(){
      localStorage.removeItem('sessionUser')
      localStorage.removeItem('loginJwt')
      this.props.history.push('/')
    }
    componentDidMount(){
      if(localStorage.length === 0){
        this.props.history.push('/')
      }
        let year = {
            deptYear: 2018
          }
        axios.post('/api/mer/atitScoresAndUser',year)
        .then(res=>{

            this.setState({allocList:res.data})
            axios.post('/api/dept/deptNamesAndSeats')
            .then(res=>{
    
              this.setState({seats:res.data})
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }
    render(){
      let show = (
        <div className="container-fluid">
                  <div className='container'>
    <nav className="navbar bg-primary navbar-dark py-md-0" id='sidebar'>
      <Link className="navbar-brand" to="/">Home</Link>
      <Link   className="navbar-brand" to="/alloc" style={{marginRight:"2%"}}>Merit List</Link>
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
  <br /><br />
  <div className='container'>
    <div className="card">
      <div className="card-body">
            <table className="table table-striped table-responsive-sm">
              <thead>
                <tr>
                  <th className='text-center'>ID</th>
                  <th className='text-center'>Name</th>
                  <th className='text-center'>ATIT Score</th>
                  <th className='text-center'>Allocated</th>
                  <th className='text-center'>Preference</th>
                  <th className='text-center'>Preference 2</th>
                  <th className='text-center'>Preference 3</th>
                </tr>
                {this.state.allocList.map((stu,ind)=>{
                return(
                    <tr key = {ind}>
                    <th className='text-center'>{stu.id}</th>
                    <th className='text-center'>{stu.name}</th>
                    <th className='text-center'>{stu.totalScore}</th>
                    <th className='text-center'>{stu.allocated }</th>
                    <th className='text-center'>{stu.preference }</th>
                    <th className='text-center'>{stu.preference2 }</th>
                    <th className='text-center'>{stu.preference3 }</th>
                    </tr>
                )
                })}
              </thead>
              <tbody>

              </tbody>
            </table>

      </div>      
    </div>
  </div>
  <div class='container'>
<div class="card">
<div class="card-header text-center"><strong>Allotment Details</strong></div>
<div class="card-body">
<table class="table table-striped table-responsive-md">
<thead>
  <tr class='text-center'>
   <th>Branch</th>
   <th>Total Seats</th>
   <th>Allocated</th>
   </tr>
    {this.state.seats.map((obj,ind)=>{
      return(
      <tr key={ind}>
      <th>{obj.DeptName}</th>
      <th>{obj.DeptSeats}</th>
      <th>{obj.allocated}</th>
      <th></th> 
      </tr>
      )
    })}
</thead>
</table>
</div>
</div>
</div>
<button onClick={this.onClick}>LOG OUT</button>
</div>
    )
    return this.state.seats.length!==0?show:<h1>Loading</h1>
    }
} 