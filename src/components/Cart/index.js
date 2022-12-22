import React from 'react'
import {useState,useEffect} from 'react'
import { menuItemsData } from '../Menu/data'
import OrderBackButton from '../OrderBackButton'
import OrderedMenu from '../OrderedMenu'
import './style.css'
import { ref, update } from "firebase/database";
import { db } from '../../database/firebase';

const Cart = (props) => {

  //Declares Variables / States
  let orderedList = []
  let tempTotalPrice = 0
  const [totalPrice, setTotalPrice] = useState(0)

  //Joins the ordered item foreign key to the food menu data
  props.cartList.map((cItem, cIndex)=>{
    menuItemsData.map((item,index)=>{
      if(cItem.itemId === item.id){
          item.quantity = cItem.itemQu
          orderedList.push(item)
      }
    })
  })

  //Confirms the order by updating the ordered food data to db
  const confirmOrder = () =>{
    update(ref(db, '/receipts/'+props.activeTable.active_receipt_id), {
      orderedFood: orderedList,
      totalPrice: totalPrice
    })
    props.togglePopUp()
  }

  //Calculates and sets the Total Price using conditional function calls(useEffect)
  useEffect(()=>{
    for(let i = 0; i < orderedList.length; i++){
      tempTotalPrice = tempTotalPrice + (orderedList[i].price *orderedList[i].quantity)
    }
    setTotalPrice(tempTotalPrice)
  },[])

  //Renders
if(props.isPopUp){
  return (
    <>
    <div onClick ={props.togglePopUp}>
      <OrderBackButton
        cartCount = {props.cartCount}
      />
    </div>
        <div className="orders">
            <h1 className='orders-heading'>Your Orders</h1>
            <div className="orders-menu">
                <OrderedMenu list={orderedList} />
            </div>
            <h3 className='orders-total'>Your Total Rp.{totalPrice} </h3>
            <button onClick={confirmOrder}>confirm Order</button>
        </div>
    </>
  )
} else{
  return(<></>)
}



}

export default Cart