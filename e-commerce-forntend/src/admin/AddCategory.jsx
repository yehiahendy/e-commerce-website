import React,{useState} from 'react';
import Layout from '../core/Layout';
const AddCategory =  () => 
{
const[name,setName] = useState('')
const[error,setError] = useState(false);
const[success,setSuccess] = useState(false);
    return(
        <Layout title = "Create Category" discreption = "This page for creating categories" className ="container col-md-8 offset-md-2">
        <form className = "form-group">
        <div>
        <label className ="text-muted">Name</label>
        <br></br>
        <input type="text" className = "form-control" autoFocus value = {name}/>
        <br></br>
        <button className = "btn btn-outline-primary">Submit</button>
        </div>
        </form>
        
        </Layout>

    );
}
export default AddCategory ;
