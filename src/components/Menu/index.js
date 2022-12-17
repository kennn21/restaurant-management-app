import React,  { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import './style.css'

const Menu = (props) => {
  return (
    <main>
      {/* {console.log(props.list[0].id)} */}
        {
          props.list.map((item)=>{
            return(
              <MenuItem key={item.id} item={item} />
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


export default Menu