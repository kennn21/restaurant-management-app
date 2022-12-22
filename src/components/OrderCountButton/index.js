import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const OrderCountButton = (props) => {

    //Renders the button to open the cart display
    return (
      <div className='btnCartCount' onClick={() => props.togglePopUp}>
          <div className="count">{props.cartCount >= 100 ? '99+' : props.cartCount}</div>
          <FontAwesomeIcon className='icon' icon={faCartShopping} />
      </div>
    )
  }

export default OrderCountButton