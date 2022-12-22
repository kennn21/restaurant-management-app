import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

const OrderBackButton = (props) => {

  //Renders the back button in the cart display
  return (
    <div className='btnCartCount' onClick={() => props.togglePopUp}>
        <div className="count">{props.cartCount >= 100 ? '99+' : props.cartCount}</div>
        <FontAwesomeIcon className='icon' icon={faBackward} />
    </div>
  )
}

export default OrderBackButton