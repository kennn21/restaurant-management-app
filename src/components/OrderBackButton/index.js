import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

const OrderBackButton = ({cartCount}) => {
    const navigate = useNavigate()
  return (
    <div className='btnCartCount' onClick={() => navigate('/client')}>
        <div className="count">{cartCount >= 100 ? '99+' : cartCount}</div>
        <FontAwesomeIcon className='icon' icon={faBackward} />
    </div>
  )
}

export default OrderBackButton