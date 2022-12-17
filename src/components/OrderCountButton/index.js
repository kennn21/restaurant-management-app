import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const OrderCountButton = ({cartCount}) => {
    const navigate = useNavigate()
  return (
    <div className='btnCartCount' onClick={() => navigate('/cart')}>
        <div className="count">{cartCount >= 100 ? '99+' : cartCount}</div>
        <FontAwesomeIcon className='icon' icon={faCartShopping} />
    </div>
  )
}

export default OrderCountButton