import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

const OrderBackButton = (props) => {
  return (
    <div className='btnCartCount' onClick={() => props.togglePopUp}>
        <div className="count">{props.cartCount >= 100 ? '99+' : props.cartCount}</div>
        <FontAwesomeIcon className='icon' icon={faBackward} />
    </div>
  )
}

export default OrderBackButton