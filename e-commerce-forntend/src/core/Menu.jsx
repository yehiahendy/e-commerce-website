import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import SignOut from '../user/Signout';
import { isAuthenticate } from '../user/auth';
import { Fragment } from 'react';
const isActive = (history,path) =>
{

return  history.location.pathname === path ? {color : '#ff9900'} : {color : '#FFFF'} ;
}
const menu = ({history}) =>{ 
    return(
        <div>
            <ul className = "nav nav-tabs bg-primary">
                <li className = "nav-item">
                    <Link className = "nav-link" to ="/" style = {isActive(history,"/")}>Home</Link>
                </li>
                <li className = "nav-item">
                    <Link className = "nav-link" to ="/shop" style = {isActive(history,"/shop")}>Shop</Link>
                </li>
                {
                    ((isAuthenticate()) && (isAuthenticate().user.role === 0) && 
                    (<li className = "nav-item">
                    <Link className = "nav-link" to ="/user/dashboard" style = {isActive(history,"/user/dashboard")}>DashBoard</Link></li>))
                }
                {
                    ((isAuthenticate()) && (isAuthenticate().user.role === 1) && 
                    (<li className = "nav-item">
                    <Link className = "nav-link" to ="/admin/dashboard" style = {isActive(history,"/admin/dashboard")}>DashBoard</Link></li>))
                }
                
                {!isAuthenticate() && (
                <Fragment>
                <li className = "nav-item">
                <Link className = "nav-link" to ="/signup" style =  {isActive(history,"/signup")}>Signup</Link>
                </li>
                <li className = "nav-item">
                <Link className = "nav-link" to ="/signin" style =  {isActive(history,"/signin")}>Signin</Link>
                </li>
                </Fragment>
                )}
                {isAuthenticate() && (                <li className = "nav-item">
                <span className = "nav-link"  style =  {{cursor : "pointer" ,color :'#ffff'}} onClick ={() => SignOut (() => {
                history.push('/');
                })  } >SignOut</span>
                </li>)}

            </ul>
        </div>
    );

}
export  default withRouter(menu) ;