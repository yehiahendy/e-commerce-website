import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticate } from './auth';
const dashBoard = () => {
    const {user} = isAuthenticate();
    user.history = 'History'
    return(
        <Layout title ="DashBoard Page" discreption = "This is the Dash board page for Ecommerce website " className = "container col-md-8 offset-md-2">
            <div className ="card mb-5">
                <h3 className = "card-header">User Info</h3>
                <ul className = "list-group">
                    <li className ="list-group-item">{user.name}</li>
                    <li className ="list-group-item">{user.email}</li>
                    <li className ="list-group-item">{user.role === 1 ? 'Admin' : 'User' }</li>
                </ul>
            </div>
            <div className ="card mb-5">
                <h3 className = "card-header ">Purches History</h3>
                <ul className = "list-group">
                    <li className ="list-group-item">{user.history}</li>
                </ul>
            </div>
        </Layout>
    );
}
export default dashBoard ;