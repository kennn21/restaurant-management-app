import React,  { useEffect, useState } from 'react'
import OrderedItem from './OrderedItem'
import './style.css'

const OrderedMenu = (props) => {
  return (
    <main>
      {console.log(props.list[0].id)}
        {
          props.list.map((item)=>{
            return(
              <OrderedItem key={item.id} item={item} />
            )
          })
        }
      {/* {Object.entries(props.list).map((item, i)=>{
        <h1>{item.id}</h1>
      })} */}
       {/* {console.log(props.list)} */}
    </main>
  )
}


export default OrderedMenu