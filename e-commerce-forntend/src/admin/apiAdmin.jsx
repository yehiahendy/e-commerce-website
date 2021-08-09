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
export const getCategories = () => {
    return fetch(`${API}/category/list`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};
export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {return error } );
};
export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/update/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};
export const deletProduct = (userId, token, productId) => {
    return fetch(`${API}/product/remove/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};
export const getproducts = () => {
    return(
        fetch(`${API}/products?limit=undefind`, {
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
export const getproduct = (productId) => {
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
export {AddNewCategory} ;
export {AddNewProduct} ;
export {getCategory} ;