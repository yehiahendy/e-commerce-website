import React, { useEffect,useState } from 'react';
const CheckBox = ({categories,handelFiler}) => {
    const [checked,setChecked] = useState([]);
    const handelToggle = c => () => {
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]
        if(currentCategoryId === -1 )
        {
            newCheckedCategoryId.push(c)
        }
        else
        {
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        setChecked(newCheckedCategoryId)
        handelFiler(newCheckedCategoryId)
    }
    return(
    categories.map((c,i) => (
    <li className = "list-unstyled"  key = {i}>
    <input type = "checkbox"  className ="form-check-input" onChange = {handelToggle(c._id)} value ={checked.indexOf(c._id === -1)}></input>
    <label className = "form-check-label">{c.name}</label>
    </li>

    ))
    );
} 
export default CheckBox;