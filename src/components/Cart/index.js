import React from 'react'
import {useState,useEffect} from 'react'
import { menuItemsData } from '../Menu/data'
import OrderBackButton from '../OrderBackButton'
import OrderedMenu from '../OrderedMenu'
import './style.css'
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from '../../database/firebase';

const Cart = (props) => {

  let orderedList = []
  let tempTotalPrice = 0
  const [totalPrice, setTotalPrice] = useState(0)

  console.log("cart list")
  console.log(props.cartList)

  // const addObjectToArray = obj => {
  //   setOrderedList(current => [...current, obj]);
  // };

  props.cartList.map((cItem, cIndex)=>{
    menuItemsData.map((item,index)=>{
      if(cItem.itemId === item.id){
          item.quantity = cItem.itemQu
          orderedList.push(item)
      }
    })
  })

  const confirmOrder = () =>{
    update(ref(db, '/receipts/'+props.activeTable.active_receipt_id), {
      orderedFood: orderedList,
      totalPrice: totalPrice
    })
    console.log(props.activeTable.active_receipt_id)
  }

  useEffect(()=>{
    for(let i = 0; i < orderedList.length; i++){
      tempTotalPrice = tempTotalPrice + (orderedList[i].price *orderedList[i].quantity)
    }
    setTotalPrice(tempTotalPrice)
  },[])

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
                  {/* <Menu list={menuItemsData} /> */}
                  <OrderedMenu list={orderedList} />
              </div>
              <h3 className='orders-total'>Your Total Rp.{totalPrice} </h3>
              <button onClick={confirmOrder}>confirm Order</button>
          </div>
      </>
    )


}

export default Cart