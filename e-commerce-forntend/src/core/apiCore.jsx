import React from 'react';
import { API } from './../config';
const getProduct = (sortby) => {
    return(
        fetch(`${API}/products?sortBy=${sortby}&order=desc&limit=6`, {
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
const getCategory = () => {
    return(
        fetch(`${API}/category/list`, {
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
export {getCategory};