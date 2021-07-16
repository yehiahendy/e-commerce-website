import React, { useState }  from 'react';
import { Redirect } from 'react-router-dom';
import Layout from './../core/Layout';
import authentication,{isAuthenticate} from './auth';
const Signin = () => {
    const [values,setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading : false,
        redirectToReferrer : false
    });
    const {email,password, error,loading,redirectToReferrer } = values;
    const {user} = isAuthenticate();
/******************************************************************************************************************************* */
    const creatUi = () => 
    {
        return(
            <form>
                <div className = "form-group">
                    <label className = "text-muted">Email</label>
                    <input type ="text" className = "form-control" onChange ={handelChanges('email')}></input>
                </div>
                <div className = "form-group">
                    <label className = "text-muted">Password</label>
                    <input type ="password" className = "form-control" onChange ={handelChanges('password')}></input>
                </div>
                <button className = "btn btn-primary" onClick = {submitHandler}>Sign in</button>
            </form>
        );
    }
/************************************************************************************************************************************ */
    const handelChanges = name => event =>
    {
        setValues({...values,loading :false,redirectToReferrer :false,[name]:event.target.value});
    }
/************************************************************************************************************************************** */
    const signinSubmit = user =>{

        return (fetch("http://localhost:8000/api/signin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
        })
        .then(Response =>{
        
            return Response.json();
    
        })
        .catch(err => {
            console.log(err)
        }));
    }
/********************************************************************************************************************************************** */
    const submitHandler = (e) =>{
        e.preventDefault();
        signinSubmit({email,password})
        //this part to get the error msg and clear the text field
        .then(                             
            data => {
                if(data.error)
                {
                    setValues({...values,error:data.error,loading : false,redirectToReferrer : false})
                }
                else{

                    authentication(data,
                    () => setValues({...values,
                            email : '',
                            password : '',
                            error : false,
                            loading : true,
                            redirectToReferrer : true
                        })
                        );
                }
            });
        
        }
/********************************************************************************************************************************************* */
    const showErrorMsg = () => {
        return(
            <div className = "alert alert-danger" style = {{display : error ? '' :'none'}}>{error}</div>
        );
        }
        const showSuccessMsg = () => {
            return(
                <div className = "alert alert-info" style = {{display : loading ? '' :'none'}}>
                    Loading......
                    </div>
            );
        }
/**************************************************************************************************************************************************** */
    const redirectUser = () =>{
            if (redirectToReferrer)
            {
                if((user.role === 0) && user)
                return (<Redirect to="/user/dashboard" />);
                else 
                return (<Redirect to="/admin/dashboard" />);
            }
            
    }


/***************************************************************************************************************************************************** */


return(
<Layout title ="Sign in Page" discreption = "This is the sign in page for Ecommerce website " className = "container col-md-8 offset-md-2">
{showSuccessMsg()}
{showErrorMsg()}
{creatUi()}
{redirectUser()}
</Layout>
);
}

export default Signin