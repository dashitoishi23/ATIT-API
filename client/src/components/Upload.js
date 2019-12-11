import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../styles/allocList.css'
import axios from 'axios'

export default class fileUpload extends Component{
    constructor(){
        super();
        this.state = {
            file:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({file:e.target.files[0]})
    }
    onSubmit(e){
        e.preventDefault()
        const formData = new FormData(); 
        console.log(this.state.file)
        formData.append('file',this.state.file)
        axios.post('/api/upload',formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res=>{
            this.props.history.push('/uploadTerm')
        })
        .catch(err=>{
            console.log(err)
        })

    }
    componentDidMount(){
        if(localStorage.length===0){
            this.props.history.push('/')
        }
    }
    render(){
        return(
        <div className='container'>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to="/">Upload</Link>
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
        <form onSubmit={this.onSubmit}>
        <div className="form-group"  >
            <label htmlFor="exampleFormControlFile1">Upload ATIT excelsheet</label>
            <input type="file" className="form-control-file" onChange={this.onChange} id="exampleFormControlFile1" />
            <button type="submit">Upload file</button>
        </div>
        </form>
        <br />
        <br />
        <Link to='/merit'><button>Merit List of Students</button></Link>
        <br />
        <br />
        <Link to='/uploadTerm'><button>Upload a fee status file</button></Link>
        <br />
        <br />
        <Link to='/alloc'><button>Allocation List</button></Link>
        <br />
        <br />
        <Link to='/slide'><button >Sliding Up List</button></Link>
        <br />
        <br />
        <Link to='/updSeats'><button >Update Seats</button></Link>
        <h3>File Format</h3>
        <p>Column 1. ID</p>
        <p>Column 2. Name</p>
        <p>Column 3. Maths</p>
        <p>Column 4. Physics</p>
        <p>Column 5. English</p>
        <p>Column 6. Logical</p>
        <p>Column 7. Total Score</p>
        <p>Column 8. Email</p>
        <p>Column 9. Preference</p>
        <p>Column 10. Preference 2</p>
        <p>Column 11. Preference 3</p>
        </div>
        )
    }
} 