import React from 'react'
import {useState,useEffect} from 'react'
import { menuItemsData } from '../Menu/data'
import OrderBackButton from '../OrderBackButton'
import OrderedMenu from '../OrderedMenu'
import './style.css'
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from '../../database/firebase';

const Cart = (props) => {

  var orderedList = []
  const [updatedFood, setUpdatedFood] = useState({})

  console.log("cart list")
  console.log(props.cartList)
  menuItemsData.map((item, index)=>{
    // props.cartList.map((cItem, cIndex)=>{
    //   if(item.id === cItem.itemId){
    //     setOrderedList(current => [...current, item])
    //   }
    //   console.log(orderedList)
    // })
  })

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

  // useEffect(()=>{
  //   onValue(ref(db,"/receipts/"+), (snapshot) => {
  //     setTables([])
  //     const data = snapshot.val()
  //     if(data){
  //       setTables(data)
  //     }
  //   })
  // },[])

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
              <h3 className='orders-total'>Your Total Rp. </h3>
          </div>
      </>
    )


}

export default Cart