const addItem = (item,next) => {
    let cart = []
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            count:1
        });
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });
        localStorage.setItem('cart',JSON.stringify(cart))
        next();
    }
}
const itemTotal = () => {
    if(typeof window !== 'undefined')
    {
        
        return (JSON.parse(localStorage.getItem('cart')) !== null  && JSON.parse(localStorage.getItem('cart')).length);
    }
    return 0 ;
}
const getItems = () => {
    if(typeof window !== 'undefined')
    {
        return JSON.parse(localStorage.getItem('cart'))
    }
}
const updateItem = (productId,count) => {
    let cart = []
    if(typeof window !== "undefined")
    {
       
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((p,i) => {
            if(p._id === productId)
            {
                cart[i].count = count
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}
const removeItem = (productId) => {
    let cart = []
    if(typeof window !== "undefined")
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((p,i) => {
            if(p._id === productId)
            {
                cart.splice(i,1)
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
    }
    return cart;
}
const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
};

export {addItem};
export {getItems};
export {itemTotal};
export {updateItem};
export {removeItem};
export {emptyCart};