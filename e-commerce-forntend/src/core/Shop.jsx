import Layout from "./Layout";
import { useEffect, useState } from 'react';
import React from 'react';
import {getCategory, getFilterdProducts} from './apiCore'
import CheckBox from './CheckBox';
import { FixedPrice } from "./FixedPrice";
import RadioBox from "./RadioBox";
import Card from './Card';
import Search from "./Search";
const Shop = () =>{
    const [categories,setCategories]  = useState([]);
    const [myFilters,setMyFilters]  = useState({
        filter: {category:[],price:[]}
    });
    const [error,setError]  = useState(false);
    const [skip,setSkip]  = useState(0);
    const [limit,setLimit]  = useState(6);
    const [size,setSize]  = useState(0);
    const [filteredResults,setFilteredResults]  = useState([]);
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
        loadFilterResults(myFilters.filter);
    }
    ,[]);
    const handelFiler = (filters,filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filter[filterBy] = filters
        if(filterBy === 'price')
        {
            let priceValues = handelPrice(filters)
            newFilters.filter[filterBy] = priceValues
        }
        loadFilterResults(myFilters.filter)
        setMyFilters(newFilters)
    }
    const loadFilterResults = filters =>
    {
        getFilterdProducts(skip,limit,filters)
        .then(data => {
            if(data.error)
            {
                setError(data.error)
            }else
            {
                setFilteredResults(data.data)
                setSize(data.size)
            }
        })
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
    const loadMore = () =>
    {
        let toSkip = skip + limit 
        getFilterdProducts(toSkip,limit,myFilters.filter)
        .then(data => {
            if(data.error)
            {
                setError(data.error)
            }else
            {
                setFilteredResults([...filteredResults,...data.data]);
                setSize(data.size)
                setSkip(0)
            }
        })
    }
    const loadMoreBtn = () => {
        return(
            size > 0 && size >= limit && (<button className = "btn btn-outline-warning mb-5" onClick ={loadMore}>
                Load More
            </button>)
        );
    }
    const createUi = () => {
        return (
            <div className = "row">
            <Search></Search>
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
            <h2>Best Sellers</h2>
            <div className="row">
            {filteredResults.map((product,i) => {
            return(<Card key = {i} product = {product}/>); 
            })}
            <div>
            <hr></hr>
            {loadMoreBtn()}
            </div>
            
            </div>
            </div>
            </div>

        );
    }
    return(
        <Layout title ="Shop Page" discreption = "Welcome to our E-commerce Website " className = "container-fluid">
        {createUi()}
    </Layout>
    );
}
export default Shop;