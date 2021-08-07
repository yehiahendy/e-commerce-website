import React from 'react';
import Layout from './Layout';
import { getProduct } from './apiCore';
import { useState, useEffect } from 'react';
import Card from './Card';
import { API } from '../config';
const Home = () => {
const [productBySell,setproductBySell] = useState([])
const [productByArrival,setproductByArrival] = useState([]);
const [error,setError] = useState(false);

    const loadProductBySell = () => {
        return(
            getProduct('sold')
            .then(data => {
                if(data.error)
                {
                    setError(data.error)
                }
                else
                {
                    setproductBySell(data)
                }
            })
        );
    }
    const loadProductByArrival = () => {
        return(
            getProduct('createdAt')
            .then(data => {
                if(data.error)
                {
                    setError(data.error)
                }
                else
                {
                    setproductByArrival(data)
                }
            })
        );
    }
useEffect(() => {
    loadProductBySell();
    loadProductByArrival();
},[])
return(

    <Layout title ="Home Page" discreption = "This is the Home page for Ecommerce website " className = "container">
        <h2>New Arrival</h2>
        <div className = "row">
        {productByArrival.map((product,i) => {
                return(
            <div key = {i} className = "col-4 mb-3">
            <Card  product = {product}/>
            </div>
                );
            })}
        </div>
        <br></br>
        <h2>Best Sellers</h2>
        <div className = "row">
        {productBySell.map((product,i) => {
                return(
            <div key = {i} className = "col-4 mb-3">
            <Card  product = {product}/>
            </div>
                );
            })}
        </div>
    </Layout>
);
}
export default Home; 