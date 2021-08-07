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
const listRelatedProducts = productId => {
    
    return( 
        
        fetch(`${API}/products/relate/${productId}`, {
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
const getBraintreeClientToken = (userId,token) => {
    return(
        fetch(`${API}/braintree/gettoken/${userId}`, {
        method: 'GET',
        headers:
        { 'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
    })
    .then(Response => {
        return Response.json();
    })
    .catch(error => {
        return error;
    })
    );
} 
export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export {getProduct};
export {getBraintreeClientToken};
export {getCategory};
export {getFilterdProducts};
export {list};
export {read};
export {listRelatedProducts};
