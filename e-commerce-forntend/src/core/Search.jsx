import { useState, useEffect } from 'react';
import { getCategory,list } from './apiCore';
import Card from './Card';

const Search = () => {
    const [data,setData] = useState({
        categories : [],
        category:'',
        search: '',
        results : [],
        searched : false 

    });
    const {categories,category,search ,results ,searched } = data; 
    const loadcategories = () => 
    {
        getCategory().then(data => {
            if(data.error)
            {
                console.log(data.error)
            }
            else
            {
                setData({...data,categories:data,searched:false})
            }
        })
    }
    useEffect(() => {
        loadcategories();
    },[]) 
    const onSubmitHandler = (e) => 
    {
        e.preventDefault();

        searchData();
        
        
    }
    const searchData = () => {
        if(search)
        {
            list({search:search,category:category}).then(Responsen => {
                if(Responsen.error)
                {
                    console.log(Response.error)
                }
                else
                {
                    setData({...data,results:Responsen,searched:true})
                }
            })
        }
    }
    const onHandelChange = name => event => 
    {
        setData({...data,[name] : event.target.value})
        
    }
    const searchedProducts = (results=[]) =>
    {
        return(
            <div className ='row'>
                {results.map((p,i) => (
                    <Card key = {i} product = {p}/>
                ))}
            </div>
        );
    }
    const searchedProductsResults = (searched,results) => 
    {
        
        return (
            <h2>{results ? 'Found' : 'Not Found'}</h2>
        );
    }
    const SearchForm = () => (
        <form onSubmit={onSubmitHandler}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={onHandelChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={onHandelChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )
    return(
        <div className = 'row ml-2 mr-2'>
            <div className = "container">
                {SearchForm()}
            </div>
            <div className = "container-fluid row ">
                {searchedProducts(results)}
            </div>
        </div>
    ); 

}
export default Search