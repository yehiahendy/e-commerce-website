import Layout from './../core/Layout';
import { useState } from 'react';
import { isAuthenticate } from './auth';
import { readProfile, update, updateProfile } from './apiUser';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
const Profile = () => {
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success: false
    })
    const {name,email,password,error,success} = values
    const {user,token} = isAuthenticate();
    const loadProfile = () =>{
        readProfile(user._id,token)
        .then(data => {
            if(data.error)
            {
                console.log(data.error)
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,
                    name:data.name,
                    email:data.email,
                    password:data.password,
                })
            }

        })
    }
    useEffect(() => {
        loadProfile();
    },[])
    const onChangeHandler = name => e => {
        setValues({...values,[name]:e.target.value})
    }
    const onSubmitHandler = e => {
        e.preventDefault();
        update(user._id,token,{name,email,password})
        .then(data => {
            if(data.error)
            {
                
                setValues({...values,error:data.error,success:false})
            }
            else{
                updateProfile(data,() => {
                    setValues({...values,name:data.name,email: data.email, password: data.password,success:true})
                })
            }
        })
    }
    const createUi = () => {
        return(
            <form>
                <div className = 'form-group mb-3'>
                    <label className = "text-muted">Name</label>
                    <input className = "form-control" value = {name} onChange ={onChangeHandler('name')}></input>
                </div>
                <div className = 'form-group mb-3'>
                    <label className = "text-muted">E-mail</label>
                    <input type = "email" className = "form-control" value = {email} onChange ={onChangeHandler('email')}></input>
                </div>
                <div className = 'form-group mb-3'>
                    <label className = "text-muted">Password</label>
                    <input type = "password" className = "form-control" value = {password} onChange ={onChangeHandler('password')}></input>
                </div>
                <button className = "btn btn-primary btn-sm" onClick = {onSubmitHandler}>Update</button>
            </form>
        );
    }
    const redirectUser = success => {
        if (success) {
            return <Redirect to="/user/dashboard" />;
        }
    };
    return(
        <Layout title ="My Profile" discreption = {`Welcome ${values.name}`} className = "container-fluid">
            <h2>Profile Update</h2>
            {createUi()}
            {redirectUser(success)}
        </Layout>
        );
}
export default Profile;