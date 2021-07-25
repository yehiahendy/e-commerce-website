import React from 'react';
import Layout from './Layout';
import { getProduct } from './apiCore';
import { useState, useEffect } from 'react';
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

    <Layout title ="Home Page" discreption = "This is the Home page for Ecommerce website ">

    <br></br>
    {JSON.stringify(productBySell)}
    </Layout>
);
}
export default Home; 