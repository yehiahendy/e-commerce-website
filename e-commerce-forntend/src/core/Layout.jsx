import React from 'react';
import Menu from './Menu';
const Layout = ({title = 'Title', discreption = 'Description',children,className}) => {  
return(

<div>
    <Menu></Menu>
    <div className = "Jumbotron shadow-none p-3 mb-5 bg-light rounded"> 
        <h1 >{title}</h1>
        <p className = "lead">  {discreption}</p>
    </div>
    <div className = {className}>{children}</div>
</div>


);
    
};
export default Layout;