import React from 'react';
import { useState } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { API } from '../config';
const Signup = () => {
const [values,setValues] = useState({
        name :'',
        email : '',
        password : '',
        error : '',
        success : false
    });
    const {name,email,password,error,success} = values;
const handelChanges = name => event => {
    setValues({...values,error :false,[name]:event.target.value})

}
const sinupSubmit = user =>{

return (fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(Response =>{
    
        return Response.json();

    })
    .catch(error => {
        return error;
    }));

}
const submitHandler = (e) =>{
e.preventDefault();
sinupSubmit({name,email,password})
//this part to get the error msg and clear the text field
.then(                             
    data => {
        if(data.error)
        {
            setValues({...values,error:data.error,success: false})
        }
        else{
            
            setValues({...values,
                name :'',
                email : '',
                password : '',
                error : false,
                success : true
            })
        }
    });

}
const creatUi = () => {
    return(
        <form>
            <div className = "form-group">
                <label className ="text-muted">name</label>
                <input type="text" className = "form-control" onChange = {handelChanges('name')} />
            </div>
            <div className = "form-group">
                <label className ="text-muted">email</label>
                <input type="email" className = "form-control " onChange = {handelChanges('email')} />
            </div>
            <div className = "form-group">
                <label className ="text-muted">password</label>
                <input type="password" className = "form-control" onChange = {handelChanges('password')} />
            </div>
            <button className = " btn btn-primary" onClick={submitHandler}>Submit</button>
        </form>
    );
}
const showErrorMsg = () => {
    return(
        <div className = "alert alert-danger" style = {{display : error ? '' :'none'}}>{error}</div>
    );
}
const showSuccessMsg = () => {
    return(
        <div className = "alert alert-info" style = {{display : success ? '' :'none'}}>
            New account is created please
            <Link to="/signin"> Sign in</Link>
            </div>
    );
}


return(
<Layout title ="Sign up Page" discreption = "This is the sign up page for Ecommerce website " className = "container col-md-8 offset-md-2">
    {showSuccessMsg()}
    {showErrorMsg()}
    {creatUi()}

</Layout>

);
}

export default Signup;