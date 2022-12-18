import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const OrderCountButton = (props) => {
    return (
      <div className='btnCartCount' onClick={() => props.togglePopUp}>
          <div className="count">{props.cartCount >= 100 ? '99+' : props.cartCount}</div>
          <FontAwesomeIcon className='icon' icon={faCartShopping} />
      </div>
    )
  }

export default OrderCountButton