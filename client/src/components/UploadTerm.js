import React, {Component} from 'react'
import axios from 'axios'

export default class fileUpload extends Component{
    constructor(){
        super();
        this.state = {
            file:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onClick1 = this.onClick1.bind(this)
        this.onClick2 = this.onClick2.bind(this)
    }
    onChange(e){
        this.setState({file:e.target.files[0]})
    }
    onClick(){
        this.props.history.push('/merit')
    }
    onClick1(){
        this.props.history.push('/upl')
    }
    onClick2(){
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
        const formData = new FormData(); 
        console.log(this.state.file)
        formData.append('file',this.state.file)
        axios.post('/api/uploadTerm',formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res=>{
            this.props.history.push('/merit')
        })
        .catch(err=>{
            console.log(err)
        })

    }
    render(){
        return(
        <div className='container'>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"  >
            <label htmlFor="exampleFormControlFile1">Upload ATIT Term Fee Details</label>
            <input type="file" className="form-control-file" onChange={this.onChange} id="exampleFormControlFile1" />
            <button type="submit">Upload file</button>
        </div>
        </form>
        <button onClick={this.onClick}>Merit List of Students</button>
        <button onClick={this.onClick1}>Upload ATIT Scoresheet</button>
        <button onClick={this.onClick2}>LOG OUT</button>
        <h3>File Format</h3>
        <p>Column1. ID</p>
        <p>Column2. Fee Status (0->Not Paid, 1->Paid)</p>
        </div>
        )
    }
} 