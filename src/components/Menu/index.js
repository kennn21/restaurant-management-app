import React,  { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import OrderCountButton from '../OrderCountButton'
import './style.css'
import { ref, onValue, set, update } from "firebase/database"
import { db } from '../../database/firebase'
import Cart from '../Cart'
import { menuItemsData } from '../Menu/data'


const Menu = (props) => {
  const [cartList, setCartList] = useState([])
  const [cartCount, setCartCount] = useState("0")
  const [newItem, setNewItem] = useState({
    itemId: 0,
    itemQu: 0
  })
  const [activeReceiptFood, setActiveReceiptFood] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  let orderedFood = []
  let tempTotalPrice = 0

  useEffect(() =>{
    for(let i = 0; i < orderedFood.length; i++){
      tempTotalPrice = tempTotalPrice + (orderedFood[i].price *orderedFood[i].quantity)
    }
    console.log(tempTotalPrice)
    setTotalPrice(tempTotalPrice)

    if(newItem.itemId === 0) return
    addItemToCartList(newItem)
    // console.log(cartList)
    props.triggerUpdate(cartList)

    onValue(ref(db, "/receipt/"+props.activeTable.active_receipt_id),(snapshot)=>{
      const data = snapshot.val()
      if(data){
        setActiveReceiptFood(data.orderedFood)
        console.log(data)
      }
  })
  },[newItem, setNewItem])

  const triggerSetNewItem = (newItemId, newItemQu) => {
    setNewItem(
      {
        itemId : newItemId,
        itemQu : newItemQu
      }
      )
  }
  
  const addItemToCartList = newItem => {
    cartList.push(newItem)
    for(let i = 1; i < cartList.length; i++){
      if(newItem.itemId == cartList[i].itemId){
        // console.log(newItem.itemId)
        // console.log("added new item")
        if(newItem.itemQu < cartList[i].itemQu){
          cartList[i].itemQu-=1
          cartList.pop()
        }
        if(newItem.itemQu > cartList[i].itemQu){
          cartList[i].itemQu+=1
          cartList.pop()
          // console.log("add quantity")
        }
        if(newItem.itemQu === 0){
          cartList.pop()
        }
      }
    }
    setCartCount((cartList.length-1).toString())
    console.log(cartList)
  }
    props.cartList.map((cItem, cIndex)=>{
    menuItemsData.map((item,index)=>{
      if(cItem.itemId === item.id){
          item.quantity = cItem.itemQu
          orderedFood.push(item)
      }
    })
  })
    const confirmOrder = () =>{
    update(ref(db, '/receipts/'+props.activeTable.active_receipt_id), {

      orderedFood: orderedFood.slice(1) || "",
      totalPrice: totalPrice
    })
    console.log(props.activeTable.active_receipt_id)
  }
  const wrapperFunction = ()=>{
    confirmOrder()
    props.togglePopUp()
  }
  if(props.isPopUp){
    return(
      <Cart
        cartList={props.cartList.slice(1)}
        cartCount={cartCount}
        togglePopUp = {props.togglePopUp}
        isPopUp = {props.isPopUp}  
        activeTable = {props.activeTable}
      />
    )
  } else{
    return (
      <main>
            <div onClick={wrapperFunction}>
              <OrderCountButton 
                  cartCount = {cartCount}
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