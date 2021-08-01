import Layout from './Layout';
import { useState, useEffect } from 'react';
import {read} from './apiCore'
const Product = props => 
{
    const [product,setProduct] = useState({})
    const [error,setError] = useState(false)
    const loadSingleProduct = productId => {
        read(productId)
        .then(data => 
            {
                if(data.error)
                {
                    setError(data.error)
                    console.log(error)
                }
                else
                {
                    setProduct(data)
                }
            })
    }
    useEffect(() => {
        const ProductId = props.match.params.productId
        loadSingleProduct(ProductId)
    } ,[])
    return(
        <Layout title ="Product Page" discreption = "Welcome to our E-commerce Website " className = "container-fluid">
            {JSON.stringify(product)}
    </Layout>
    );
}
export default Product;