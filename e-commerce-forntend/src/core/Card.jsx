import React from 'react';
import {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import Moment from 'react-moment';
import {addItem, itemTotal,updateItem,removeItem} from './CartHelper'

const Card = ({product,viewProductButton = true,viewAddToCart = true ,cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined}) => {
    const [redirect,setRedirect] = useState(false)
    const [count, setCount] = useState(product.count);

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };
    const showProductButton = () => {
        return(
            <Link to = {`/product/${product._id}`}  className = "pr-3">
            {
                viewProductButton && (
                    <button className = "btn btn-outline-primary  mt-2 mb-2">View Product</button>
                )
            }
            
        </Link>
        );
    }
    /********************************************************** */
    const showAddtoCartButton = () => {
        return(
            
                viewAddToCart && (<button className = "btn btn-outline-warning mt-2 mb-2" onClick = {onClickHandler}>Add to cart</button>)
        );
    }
    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className="btn btn-outline-danger mt-2 mb-2"
            >
              Remove Product
            </button>
          )
        );
      };
    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge alert-success">In Stock</span>
        ) : (
        <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
    };
    const onClickHandler = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }
    const RedirectTo = () =>{
        if(redirect)
        return(
            <Redirect to = '/cart'></Redirect>
        );
    }
    const showCartUpdateOptions = cartUpdate => {
        return (
          cartUpdate && (
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
              </div>
            </div>
          )
        );
      };
    return(
        
        <div className = "card">
            <div className = "card-header name">{product.name}</div>
            <div className = "card-body">
                <ShowImage item = {product} url = "products"/>
                <p className = "black-10">{product.description}</p>
                <p className = "black-9">Cartegory: {product.category && product.category.name}</p>
                <p className = "black-8">${product.price}</p>
                <p className = "black-7">
                    Add on <Moment fromNow>{product.createdAt}</Moment>
                </p>
                
                <br></br>
                {showProductButton()}
                {showAddtoCartButton()}
                {showRemoveButton(showRemoveProductButton) }
                {showCartUpdateOptions(cartUpdate)}
                {showStock(product.Quentity)}
                {RedirectTo()}
                
            </div>
        </div>
    );
}
export default Card;