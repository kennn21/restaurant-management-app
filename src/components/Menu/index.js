import React,  { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import OrderCountButton from '../OrderCountButton'
import './style.css'
import { ref, onValue, set } from "firebase/database"
import { db } from '../../database/firebase'
import Cart from '../Cart'

const Menu = (props) => {
  const [cartList, setCartList] = useState([])
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

  // const clearDuplicates = (newItem)=>{
  //   console.log(newItem.itemId)
  //   console.log(cartList[cartList.length - 1].itemId)
  //   console.log(cartList[cartList.length - 1].itemId === newItem.itemId)
  //   if(cartList[cartList.length - 1].itemId === newItem.itemId && cartList.length > 2){
  //   cartList.push(newItem)
  //     cartList[cartList.length -1].itemQu = newItem.itemQu
  //     cartList.pop()
  //     console.log("popping")
  //   }
  // }
  
  const addItemToCartList = newItem => {
    // setCartList(current => [...current, newItem])
    // clearDuplicates(newItem)
    cartList.push(newItem)
    console.log("item id = " + newItem.itemId)
    console.log("item qu = " + newItem.itemQu)
    console.log(cartList)
  }
  
  if(props.isPopUp){
    return(
      <Cart
        cartList={props.cartList}
        togglePopUp = {props.togglePopUp}
        isPopUp = {props.isPopUp}  
      />
    )
  } else{
    return (
      <main>
            <div onClick={props.togglePopUp}>
              <OrderCountButton 
                  cartCount = {cartList.slice(1).length}
                  togglePopUp = {props.togglePopUp}
                  isPopUp = {props.isPopUp}
              />
            </div>

          {
  
            props.list.map((item)=>{
              return(
                <MenuItem
                  key={item.id}
                  item={item}
                  triggerSetNewItem={triggerSetNewItem}
                />
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