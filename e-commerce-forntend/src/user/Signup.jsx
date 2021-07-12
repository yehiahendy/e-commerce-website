import React from 'react';
import { useState } from 'react';
import Layout from '../core/Layout';
const Signup = () => {
   const [values,setValues] = useState({
        name :'',
        email : '',
        password : '',
        error : '',
        success : false
    });
    const {name,email,password} = values;
const handelChanges = name => event => {
    setValues({...values,error :false,[name]:event.target.value})

}
const sinupSubmit = user =>{

    fetch("http://localhost:8000/api/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(Response =>{
    
        return Response.JSON();

    })
    .catch(err => {
        console.log(err)
    });

}
const submitHandler = (e) =>{
e.preventDefault();
sinupSubmit({name,email,password});

}


return(
<Layout title ="Sign up Page" discreption = "This is the sign up page for Ecommerce website " className = "container col-md-8 offset-md-2">
        <form>
            <div className = "form-group">
                <label className ="text-muted">name</label>
                <input type="text" className = "form-control" onChange = {handelChanges('name')} />
            </div>
            <div className = "form-group">
                <label className ="text-muted">email</label>
                <input type="text" className = "form-control " onChange = {handelChanges('email')} />
            </div>
            <div className = "form-group">
                <label className ="text-muted">password</label>
                <input type="text" className = "form-control" onChange = {handelChanges('password')} />
            </div>
            <button className = " btn btn-primary" onClick={submitHandler}>Submit</button>
        </form>
    {JSON.stringify(values)}

</Layout>

);
}

export default Signup;