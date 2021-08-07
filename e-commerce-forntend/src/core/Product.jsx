import Layout from './Layout';
import { useState, useEffect } from 'react';
import {listRelatedProducts, read} from './apiCore'
import Card from './Card';
const Product = props => 
{
    const [product,setProduct] = useState({})
    const [listedProducts,setListedProducts] = useState([{}])
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
            listRelatedProducts(productId)
            .then(data => 
                {
                    if(data.error)
                    {
                        setError(data.error)
                        console.log(error)
                    }
                    else
                    {
                        setListedProducts(data)
                    }
                })
    }
    useEffect(() => {
        const ProductId = props.match.params.productId
        loadSingleProduct(ProductId)
    } ,[props.match.params.productId])
    const relatedProductsUi = () => {
        return(
            <div className = 'col-4 mr-3'>
                <h2>
                    Related Products
                </h2>
                {listedProducts.map((P,i) => (
                    <div key = {i} className = 'mr-3 mb-3'>
                    <Card  product = {P}></Card>
                    </div>
                ))}
                
            </div>
        );
    }
    const singleProductsUi = () => {
        return(
            <div className = " col-8">
            <Card product = {product} viewProductButton = {false}></Card>
            </div>
        );
    }
    return(
        <Layout title ={product.name} discreption = {product.description} className = "container-fluid">
            <div className = 'row'>
            {singleProductsUi()}
            {relatedProductsUi()}
            
            </div>
    </Layout>
    );
}
export default Product;