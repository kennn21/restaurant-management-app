import React,  { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import OrderCountButton from '../OrderCountButton'
import './style.css'
import Cart from '../Cart'

const Menu = (props) => {

  //Declares States
  const [cartList, setCartList] = useState([])
  const [cartCount, setCartCount] = useState("0")
  const [newItem, setNewItem] = useState({
    itemId: 0,
    itemQu: 0
  })

  //If new item state changes, adds a new ordered item to Cart List,  and triggers a function from the parent to pass a data
  useEffect(() =>{
    if(newItem.itemId === 0) return
    addItemToCartList(newItem)
    props.triggerUpdate(cartList)

  },[newItem, setNewItem])

  //Declares a function to receive data from childrens
  const triggerSetNewItem = (newItemId, newItemQu) => {
    setNewItem(
      {
        itemId : newItemId,
        itemQu : newItemQu
      }
      )
  }
  
  //An algorithm to conditionally adds/updates item to the Cartlist with conditions:
  //If the cart already has the same item, then update the quantity
  //If the cart does not already have the same item, add the new item
  const addItemToCartList = newItem => {
    cartList.push(newItem)
    for(let i = 1; i < cartList.length; i++){
      if(newItem.itemId == cartList[i].itemId){
        if(newItem.itemQu < cartList[i].itemQu){
          cartList[i].itemQu-=1
          cartList.pop()
        }
        if(newItem.itemQu > cartList[i].itemQu){
          cartList[i].itemQu+=1
          cartList.pop()
        }
        if(newItem.itemQu === 0){
          cartList.pop()
        }
      }
    }
    setCartCount((cartList.length-1).toString())
    console.log(cartList)
  }
  
  //Conditionally Renders different JSX(s) depending on PopUp Status
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
            <div style={{position: "absolute"}} onClick={props.togglePopUp}>
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

export default Menu