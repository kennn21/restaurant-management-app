import React,  { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import './style.css'
import { ref, onValue, set } from "firebase/database"
import { db } from '../../database/firebase'

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

// function Menu (props)  {
//     const [selectedFood, setSelectedFood] = useState([])
//     const [selectedReceipt, setSelectedReceipt] = useState([])
//     const [foodQty, setFoodQty] = useState(0)

//     const {item} = item


//     if (props.isPopUp) {
//         return (
//                 <main>
//         {props.map((item) => (
//             <MenuItem key={item.id} item={item} />
//         ))}
//     </main>
//         )
//     }
// }

export default Menu