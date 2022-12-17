import React,  { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import OrderCountButton from '../OrderCountButton'
import './style.css'
import { ref, onValue, set } from "firebase/database"
import { db } from '../../database/firebase'
import Cart from '../Cart'

const Menu = (props) => {
  const initialState = [
    {}
  ]
  const [cartList, addCartList] = useState(initialState)
  const [newItem, setNewItem] = useState({
    itemId: 0,
    itemQu: 0
  })
  
  useEffect(() =>{
    if(newItem.itemId === 0) return
    addItemToCartList(newItem)
    // console.log(cartList)
    props.triggerUpdate(cartList)
  },[newItem, setNewItem])

  const triggerSetNewItem = (newItemId, newItemQu) => {
    setNewItem(
      {
        itemId : newItemId,
        itemQu : newItemQu
      }
      )
  }

  const addItemToCartList = obj => {
    addCartList(current => [...current, obj])
    console.log("item id = " + obj.itemId)
    console.log("item qu = " + obj.itemQu)
    console.log(cartList)
  }
  
  if(props.isPopUp){
    return(
      <Cart cartList={props.cartList}/>
    )
  } else{
    return (
      <main>
            <div onClick={props.togglePopUp}>
              <OrderCountButton 
                  cartCount = {cartList.length}
                  togglePopUp = {props.togglePopUp}
                  isPopUp = {props.isPopUp}
              />
            </div>

          {
  
            props.list.map((item)=>{
              return(
                <MenuItem key={item.id} item={item} triggerSetNewItem={triggerSetNewItem} />
              )
            })
          }       
      </main>
    )
  }

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