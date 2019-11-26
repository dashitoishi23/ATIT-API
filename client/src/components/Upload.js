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
    }
    onChange(e){
        this.setState({file:e.target.files[0]})
    }
    onClick(){
        this.props.history.push('/merit')
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
            console.log(res)
            this.props.history.push('/uploadTerm')
        })
        .catch(err=>{
            console.log(err)
        })

    }
    render(){
        return(
        <div>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"  >
            <label htmlFor="exampleFormControlFile1">Upload ATIT excelsheet</label>
            <input type="file" className="form-control-file" onChange={this.onChange} id="exampleFormControlFile1" />
            <button type="submit">Upload file</button>
        </div>
        </form>
        <button onClick={this.onClick}>Merit List of Students</button>
        </div>
        )
    }
} 