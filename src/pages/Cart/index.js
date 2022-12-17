import React from 'react'
import { menuItemsData } from '../../components/Menu/data'
import OrderBackButton from '../../components/OrderBackButton'
import OrderedItem from '../../components/OrderedMenu/OrderedItem'
import './style.css'

const Cart = (props) => {
  return (
    <>
    <OrderBackButton />
        <div className="orders">
            <h1 className='orders-heading'>Your Orders</h1>
            <div className="orders-menu">
                {/* <Menu list={menuItemsData} /> */}
                <OrderedItem list={menuItemsData} />
            </div>
            <h3 className='orders-total'>Your Total Rp. </h3>
        </div>
    </>
  )
}

export default Cart