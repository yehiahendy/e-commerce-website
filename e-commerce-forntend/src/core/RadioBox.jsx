import React, { useState,Fragment } from 'react';

const RadioBox = ({price,handelFiler}) => {
    const [value,setValue] = useState(0)
    const handelChange = (event) =>{
        //
        handelFiler(event.target.value);
        setValue(event.target.value);
    }
    return(
        price.map((p,i) => (
        <div  key = {i}>
        <input type ="radio" className = "mr-2 ml-4" value = {`${p._id}`} onChange ={handelChange} name ={p}></input>
        <label className = "form-check-label mr-2 ml-4">{`${p.name}`}</label>
        </div>
        ))
        );

}
export default RadioBox;