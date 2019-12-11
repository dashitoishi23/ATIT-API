import React,{ Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { custLogin } from '../actions/authActions'

class Login extends Component{
    constructor(){
        super();
        this.state={
            username: '',
            password:'',
            errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.onClick = this.onClick.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    // onClick(){
    //     localStorage.removeItem('sessionUser')
    //     localStorage.removeItem('loginJwt')
    //     this.props.history.push('/')
    // }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push({
                pathname:'/upl',
                state:{
                    ...this.props.location.state,
                    name:localStorage.getItem('sessionUser')

                }
            })
        }

        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault();
        const loginUser = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.custLogin(loginUser)
    }
    render(){
        const { errors } = this.state
        const logDisp = (<div class="jumbotron">
        {errors.err && (
<div className="alert alert-primary" role="alert">
{errors.err}
</div>
)}
<span className="text-danger"></span>
<h1 class="display-4">Login!</h1>
<p class="lead">LOGIN</p>
<hr class="my-4" />
<form onSubmit={this.onSubmit}>
<div class="form-group">
<label for="exampleInputEmail">Username</label>
<input type="text" name="username" class="form-control"
id="exampleInputEmail1" aria-describedby="emailHelp"
placeholder="Enter email" onChange={this.onChange} required />
{errors.username && (
<div className="alert alert-primary" role="alert">
{errors.username}
</div>
)}
<span className="text-danger"></span>
</div>
<div class="form-group">
<label for="exampleInputPassword1">Password</label>
<input type="password" name="password"
class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.onChange} required />
{errors.password && (
<div className="alert alert-primary" role="alert">
{errors.password}
</div>
)}
<span className="text-danger"></span>
</div>
<button type="submit" class="btn btn-primary">Login</button>
</form>
</div>)
        return(
            localStorage.getItem('sessionUser') === 'admin'?<Link to={{
                pathname:'/upl'
                }}>Upload Documents</Link>:logDisp
        )
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    errors: PropTypes.func.isRequired
}
const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps,{ custLogin })(Login);