import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticate } from '../user/auth';
import { AddNewProduct, getCategory } from './apiAdmin';
import { Link } from 'react-router-dom';
const AddProduct = () => {
    const {user,token} = isAuthenticate()
    const [values,setValues] = useState({
        name: '',
        description : '',
        price : '',
        category : '',
        categories : '',
        Quentity: '',
        photo: '',
        shipping : '',
        error: '',
        loading : false, 
        createdProduct : '',
        redirectToProfile: '',
        formData: ''
    }); 
    const {
        name,
        description,
        price ,
        category ,
        error,
        categories,
        Quentity,
        shipping , 
        loading , 
        createdProduct ,
        redirectToProfile,
        formData
    } = values
    const init = () => {
        getCategory()
        .then(data => {
            if(data.error)
            {
                setValues({...values,error: data.error});
            }
            else
            {
                setValues({...values,categories:data,formData: new FormData()})
            }
        })
    }
    useEffect(() => {
        init();
    },[])
    const onChangeHandeler = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value ;
        formData.set(name,value)
        setValues({...values,[name] : value})
    }
    const onClickHandler = (e) => {

        e.preventDefault();
        setValues({...values,error:'',loading: true})
        AddNewProduct(user._id,token,formData)
        .then(data => {
            if (data.error)
            {
                setValues({...values,error : data.error})
                return data.error
            }
            else {
                setValues({...values,
                    name: '',
                    description : '',
                    price : '',
                    category : '',
                    Quentity: '',
                    photo: '',
                    shipping : '', 
                    loading : false, 
                    createdProduct: data.name
                })
            }
        })
    }
const showErrorMsg = () => {
    return(
        <div className = "alert alert-danger" style = {{display : error ? '' :'none'}}>{error}</div>
    );
    }
    const showSuccessMsg = () => {
        return(
            <div className = "alert alert-info" style = {{display : createdProduct ? '' :'none'}}>
                <h2>
                {createdProduct} is created
                </h2>
                </div>
        );
    }
/*const goBack = () => {
    if(success) 
    {
        return(
            <div className = "mt-5">
                <Link to = '/admin/dashboard' className ="text-warning" >Back to Dashboard</Link>
            </div>
        );
    }
}*/
    const creatUi = () => {
        return(
            <form className = "mb-3" onSubmit = {onClickHandler} >
            <h3>Upload Photo</h3>
            <div className="form-group">
                <label className = "btn btn-secondary" >
                <input type = "file" accept = "image/*" name = 'photo'  onChange = {onChangeHandeler('photo')}/>
                </label>
            </div>
            <br></br>
            <div className="form-group">
                <label className ="text-muted ">name</label>
                <input type = "text"  className ="form-control" value = {name} onChange = {onChangeHandeler('name')}></input>
            </div>
            <br></br>
            <div className="form-group">
                <label className ="text-muted ">descreption</label>
                <input type = "textarea"  className ="form-control" value = {description} onChange = {onChangeHandeler('description')} ></input>
            </div>
            <br></br>
            <div className="form-group">
                <label className ="text-muted ">price</label>
                <input type = "price"  className ="form-control" value = {price} onChange = {onChangeHandeler('price')} ></input>
            </div>
            <br></br>
            <div className="form-group">
                <label className ="text-muted ">Category</label>
                <select className = "form-control" value = {category} onChange = {onChangeHandeler('category')}> 
                    <option>Please select the category</option>
                    {categories && categories.map((c,i) => {
                    return(<option key = {i} value = {c._id}>{c.name}</option>);
                    
                    })}
                </select>
            </div>
            <br></br>
            <div className="form-group">
                <label className ="text-muted ">Shipping</label>
                <select className = "form-control" value = {shipping} onChange = {onChangeHandeler('shipping')}>
                <option>Please select the shipping</option>
                    <option value = "0">No</option>
                    <option value = "1">Yes</option>
                </select>
            </div>
            <br></br>
            <div className="form-group">
                <label className ="text-muted ">Quentity</label>
                <input type = "Number"  className ="form-control" value = {Quentity} onChange = {onChangeHandeler('Quentity')}></input>
            </div>
            <br></br>
            <div className="form-group">
            <button className = "btn btn-primary">Submit</button>
            </div>
            
        </form>
        );
    }
    return (
        <Layout title = 'Add New Product '  discreption = "Are you ready to add new product ? "  className ="container col-md-8 offset-md-2">
            <div className = "row">
                <div className = "col-md-8 offset-md-2">
                    {showErrorMsg()}
                    {showSuccessMsg()}
                    {creatUi()}
                </div>
                </div>
        </Layout>
    );
}
export default AddProduct;