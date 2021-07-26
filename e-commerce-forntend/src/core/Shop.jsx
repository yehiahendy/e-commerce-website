import Layout from "./Layout";
import { useEffect, useState } from 'react';
import React from 'react';
import {getCategory} from './apiCore'
import CheckBox from './CheckBox';
import { FixedPrice } from "./FixedPrice";
import RadioBox from "./RadioBox";
const Shop = () =>{
    const [categories,setCategories]  = useState([]);
    const [myFilters,setMyFilters]  = useState({
        filter: {category:[],price:[]}
    });
    const [error,setError]  = useState(false);
    const init = () => {
        getCategory()
        .then(data => {
            if(data.error)
            {
                setError(data.error);
            }
            else
            {
                setCategories(data)
            }
        })
    }
    useEffect(() => {
        init();
    }
    ,[]);
    const createUi = () => {
        return (
            <div className = "row">
            <div className = "col-4">
            <h4>Filterd By Category</h4>
            <ul>
            <CheckBox categories ={categories} handelFiler = {filter => handelFiler(filter,'category')}/>
            </ul>
            <h4>Filterd By Price</h4>
            <ul>
            <RadioBox price ={FixedPrice} handelFiler = {filter => handelFiler(filter,'price')} />
            </ul>
            </div>
            <div className = "col-8">
                {JSON.stringify(myFilters)} 
            </div>
            </div>
        );
    }
    const handelFiler = (filters,filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filter[filterBy] = filters
        if(filterBy === 'price')
        {
            let priceValues = handelPrice(filters)
            newFilters.filter[filterBy] = priceValues
        }
        setMyFilters(newFilters)
        
    }
    const handelPrice = value => {
        const data = FixedPrice
        let array = [] 
        for(let key in data)
        {
            if(data[key]._id === parseInt(value))
            array = data[key].array;
        }
        return array
    }  
    return(
    <Layout title ="Shop Page" discreption = "Welcome to our E-commerce Website " className = "container-fluid">
        {createUi()}
    </Layout>
    );
}
export default Shop;