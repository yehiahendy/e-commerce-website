import { API } from './../config';
const AddNewCategory = (userId,token,cateogry) => {
    return(
        fetch(`${API}/category/creat/${userId}`, {
        method: 'POST',
        headers:
        { 'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(cateogry)
    })
    .then(Response => {
        return Response.json();
    })
    .catch(error => {
        return error;
    })
    );
} 
const AddNewProduct = (userId,token,product) => {
    return(
        fetch(`${API}/product/creat/${userId}`, {
        method: 'POST',
        headers:
        { 
            Authorization : `Bearer ${token}`
        },
        body: product
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
export {AddNewCategory} ;
export {AddNewProduct} ;
export {getCategory} ;