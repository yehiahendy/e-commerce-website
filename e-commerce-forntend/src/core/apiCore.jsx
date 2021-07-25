import React from 'react';
const getProduct = (sortby) => {
    return(
        fetch(`http://localhost:8000/api/products?sortBy=${sortby}&order=desc&limit=6`, {
        method: 'GET'
    })
    .then(Response => {
        return Response.json();
    })
    .catch(error => {
        return error;
    })
    );
} 
export {getProduct};