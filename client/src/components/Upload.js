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
    }
    onChange(e){
        this.setState({file:e.target.files[0]})
    }
    onClick(){
        this.props.history.push('/merit')
    }
    onClick1(){
        this.props.history.push('/uploadTerm')
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
    render(){
        return(
        <div className='container'>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"  >
            <label htmlFor="exampleFormControlFile1">Upload ATIT excelsheet</label>
            <input type="file" className="form-control-file" onChange={this.onChange} id="exampleFormControlFile1" />
            <button type="submit">Upload file</button>
        </div>
        </form>
        <button onClick={this.onClick}>Merit List of Students</button>
        <button onClick={this.onClick1}>Upload a fee status file</button>
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