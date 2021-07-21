import React,{useState} from 'react';
import Layout from '../core/Layout';
import { isAuthenticate } from '../user/auth';
import { AddNewCategory } from './apiAdmin';
import { Link } from 'react-router-dom';
const AddCategory =  () => 
{
const[name,setName] = useState('')
const[error,setError] = useState('');
const[success,setSuccess] = useState(false);
const {user,token} = isAuthenticate();
const creatUi = () =>
{
    return(

    <form  onSubmit={onClickHandler} >
    <div className = "form-group">
    <label className ="text-muted">Name</label>
    <br></br>
    <input type="text" className = "form-control"  autoFocus  value = {name} onChange = {onChangeHandler} required/>
    <br></br>
    <button className = "btn btn-outline-primary" >Submit</button>
    </div>
    </form>
    );
}
const onChangeHandler  = (e) => {
    setError('')
    setSuccess(false)
    setName(e.target.value)
}

const onClickHandler = (e) => 
{
    e.preventDefault();
    AddNewCategory(user._id,token,{name})
    .then(data => {
        if(data.error)
        {
            setError(data.error);
        }
        else
        {
            setError('');
            setSuccess(true);
        }
    })
    ;
}

const showSuccess = () => {
        if(success)
        {
        return (<h3 className = "text-success">Category is created </h3>);
        }
}
const showError = () => {
    if(error)
    {
    return (<h3 className = "text-danger">This Category is exit</h3>);
    }
}
const goBack = () => {
    if(success) 
    {
        return(
            <div className = "mt-5">
                <Link to = '/admin/dashboard' className ="text-warning" >Back to Dashboard</Link>
            </div>
        );
    }
}
    return(
        <Layout title = "Create Category" discreption = "This page for creating categories" className ="container col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {creatUi()}
        {goBack()}
        
        
        </Layout>
    );
}
export default AddCategory ;
