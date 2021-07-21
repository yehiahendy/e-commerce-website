const AddNewCategory = (userId,token,cateogry) => {
    return(
        fetch(`http://localhost:8000/api/category/creat/${userId}`, {
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
export {AddNewCategory} ;