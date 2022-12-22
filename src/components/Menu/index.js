import React,  { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import OrderCountButton from '../OrderCountButton'
import './style.css'
import Cart from '../Cart'

const Menu = (props) => {
  const [cartList, setCartList] = useState([])
  const [cartCount, setCartCount] = useState("0")
  const [newItem, setNewItem] = useState({
    itemId: 0,
    itemQu: 0
  })
  useEffect(() =>{
    if(newItem.itemId === 0) return
    addItemToCartList(newItem)
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