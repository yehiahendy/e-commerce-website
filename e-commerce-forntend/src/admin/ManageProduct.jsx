import Layout from './../core/Layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { getproducts, deletProduct } from './apiAdmin';
import { isAuthenticate } from '../user/auth';
import { Link } from 'react-router-dom';
const ManageProduct = () => {
    const [products,setProducts] = useState([{}])
    const [error,setError] = useState(false)
    const {user , token} = isAuthenticate();
    const loadProducts = () => {
        getproducts()
        .then(data => {
            if(data.error)
            {
                console.log(data.error)
                setError(data.error)
            }
            else
            {
                setProducts(data)
            }
        })
    }
    const destroy = productId => {
        deletProduct(user._id,token,productId)
        .then(data => {
            if(data.error)
            {
                console.log(data.error)
            }
            else 
            {
                loadProducts();
            }
        })
    }
    useEffect(() => {
        loadProducts();
    },[])
    return(
        <Layout title = "Manage Products" discreption = "This page for Update and delete  products" className ="container-fluid">
            <div className = "row">
                <div className="col-12">
                    <ul>
                        {products.map((p,i)=>(
                        <li className="list-group-item d-flex justify-content-between align-items-center" key ={i}>
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="btn btn-outline-success btn-sm align-middle">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    Delete
                                </span>
                        </li>
                        ))}
                    </ul>
                </div>

            </div>
        </Layout>
    );
}
export default ManageProduct