import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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
                    <Link className = "nav-link" to ="/signup" style =  {isActive(history,"/signup")}>Signup</Link>
                </li>
                <li className = "nav-item">
                    <Link className = "nav-link" to ="/signin" style =  {isActive(history,"/signin")}>Signin</Link>
                </li>
            </ul>
        </div>
    );

}
export  default withRouter(menu) ;