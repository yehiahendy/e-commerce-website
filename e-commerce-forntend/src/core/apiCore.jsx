import React from 'react';
import { API } from './../config';
import queryString from 'query-string';
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
const getFilterdProducts= (skip,limit,filters={}) => {
    const data = {
        skip,
        limit,
        filters
    };
    return(
        fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers:
        { 'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(Response => {
        return Response.json();
    })
    .catch(error => {
        return error;
    })
    );
} 
const list = (params) => {
    const query = queryString.stringify(params)
    return( 
        
        fetch(`${API}/products/search?${query}`, {
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
const read = productId => {
    
    return( 
        
        fetch(`${API}/product/${productId}`, {
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
export {getFilterdProducts};
export {list};
export {read};