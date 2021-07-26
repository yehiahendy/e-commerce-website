import React from 'react';
import Menu from './Menu';
import "./style.css";
const Layout = ({title = 'Title', discreption = 'Description',children,className}) => {  
return(

<div>
    <Menu></Menu>
    <div className = "jumbotron shadow-none p-3 mb-5 bg-light rounded"> 
        <h1 >{title}</h1>
        <p className = "lead">  {discreption}</p>
    </div>
    <div className = {className}>{children}</div>
</div>


);
    
};
export default Layout;