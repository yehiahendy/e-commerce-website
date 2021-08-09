import React from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticate } from './auth';
const adminDashBoard = () => {
    const {user: {_id,name,email,role}} = isAuthenticate()
    const adminInfo = () => {
        return(
            
    <div className ="card mb-5">
        <h3 className = "card-header">Admin Info</h3>
        <ul className = "list-group">
            <li className ="list-group-item">{name}</li>
            <li className ="list-group-item">{email}</li>
            <li className ="list-group-item">{role === 1 ? 'Admin' : 'User' }</li>
        </ul>
    </div>
        );
    };

    const adminLinks = () => {
        return(
            <aside>
                <header className = "card-header"> <strong> User links</strong></header>
                <ul className = "list-group">
                    <li className = "list-group-item">
                        <NavLink to = "/create/category">Create New Category</NavLink>
                    </li>
                    <li className = "list-group-item">
                        <NavLink to = "/create/product"> Create  New Product</NavLink>
                    </li>
                    <li className = "list-group-item">
                        <NavLink to = "/admin/orders"> Orders</NavLink>
                    </li>
                    <li className = "list-group-item">
                        <NavLink to = "/manage/products"> Manage Products</NavLink>
                    </li>
                </ul>
            </aside>
        );
    }
    return(
        <Layout title ="DashBoard Page" discreption = {`Welcome ${name}`}  className = "container">
            <div className = "row">
                <div className = "col-3">{adminLinks()}</div>
                <div className = "col-9">
                {adminInfo()}
                </div>


            </div>
        </Layout>
    );
}
export default adminDashBoard ;