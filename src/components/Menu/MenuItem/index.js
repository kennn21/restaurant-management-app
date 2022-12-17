import React, { useState, useEffect } from 'react'
import ButtonAddRemoveItem from '../../ButtonAddRemoveItem'
import './style.css'



const MenuItem = (props) => {
    const {id, name, info, price, img} = props.item
    const [quantity, setQuantity] = useState(0)

    const handleRemoveItem = ()=>{
      setQuantity(quantity-1)
    }
    const handleAddItem = ()=>{
      setQuantity(quantity+1)
    }

    useEffect(()=>{
      props.triggerSetNewItem(id, quantity)
    },[quantity])

  return (
    <div className='item'>
        <img src={img} alt="item" />
        <div className="item-head_desc">
            <p className="head_desc-name">{name}</p>
            <p className="head_desc-info">
                <small>{info}</small>
            </p>
        </div>
        <div className="item-foot_desc">
            <span className="foot_desc-price">Rp. {price}</span>
           <ButtonAddRemoveItem
           quantity={quantity}
           handleRemoveItem = {handleRemoveItem}
           handleAddItem = {handleAddItem}
           />
        </div>
    </div>
  )
}

export default MenuItem