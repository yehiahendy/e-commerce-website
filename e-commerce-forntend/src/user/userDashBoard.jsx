import React from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticate } from './auth';
const dashBoard = () => {
    const {user} = isAuthenticate()
    console.log(user)
    user.history = 'History'
    const userInfo = () => {
        return(
            
    <div className ="card mb-5">
        <h3 className = "card-header">User Info</h3>
        <ul className = "list-group">
            <li className ="list-group-item">{user.name}</li>
            <li className ="list-group-item">{user.email}</li>
            <li className ="list-group-item">{user.role === 1 ? 'Admin' : 'User' }</li>
        </ul>
    </div>
        );
    };
    const purchaseHistory = () => {
        return(
            <div className ="card mb-5">
            <h3 className = "card-header ">Purches History</h3>
            <ul className = "list-group">
                <li className ="list-group-item">{user.history}</li>
            </ul>
        </div>
        );
    }
    const userLinks = () => {
        return(
            <aside>
                <header className = "card-header"> <strong> User links</strong></header>
                <ul className = "list-group">
                    <li className = "list-group-item">
                        <NavLink to = "/card"> My card</NavLink>
                    </li>
                    <li className = "list-group-item">
                        <NavLink to = "/profile/update"> Update My profile</NavLink>
                    </li>
                </ul>
            </aside>
        );
    }
    return(
        <Layout title ="DashBoard Page" discreption = {`Welcome ${user.name}`}  className = "container">
            <div className = "row">
                <div className = "col-3">{userLinks()}</div>
                <div className = "col-9">
                {userInfo()}
                {purchaseHistory()}
                </div>
            </div>
            
        </Layout>
    );
}
export default dashBoard ;