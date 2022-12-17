import React, { useEffect, useState } from 'react'
import './style.css'



const OrderedItem = (props) => {
    const {id, name, info, price, img} = props.item
    const [quantity, setQuantity] = useState(0)

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
        </div>
    </div>
  )
}

export default OrderedItem