import React from 'react'
import OrderedItem from './OrderedItem'
import './style.css'

const OrderedMenu = (props) => {
  //Loops the ordered food list given by Cart
  return (
    <main>
        {
          props.list.map((item)=>{
            return(
              <OrderedItem key={item.id} item={item} />
            )
          })
        }
    </main>
  )
}


export default OrderedMenu