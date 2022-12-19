import React from 'react'
import {useState,useEffect} from 'react'
import { menuItemsData } from '../Menu/data'
import OrderBackButton from '../OrderBackButton'
import OrderedMenu from '../OrderedMenu'
import './style.css'
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from '../../database/firebase';

const Cart = (props) => {

  // let orderedFood = []
  // let tempTotalPrice = 0
  const [totalPrice, setTotalPrice] = useState(0)
  const [dbOrderedFood, setDbOrderedFood] = useState([])

  // const addObjectToArray = obj => {
  //   setOrderedList(current => [...current, obj]);
  // };

  // props.cartList.map((cItem, cIndex)=>{
  //   menuItemsData.map((item,index)=>{
  //     if(cItem.itemId === item.id){
  //         item.quantity = cItem.itemQu
  //         orderedFood.push(item)
  //     }
  //   })
  // })

  // const confirmOrder = () =>{
  //   update(ref(db, '/receipts/'+props.activeTable.active_receipt_id), {
  //     orderedFood: orderedFood,
  //     totalPrice: totalPrice
  //   })
  //   console.log(props.activeTable.active_receipt_id)
  // }

  useEffect(()=>{
    // for(let i = 0; i < orderedFood.length; i++){
    //   tempTotalPrice = tempTotalPrice + (orderedFood[i].price *orderedFood[i].quantity)
    // }
    // setTotalPrice(tempTotalPrice)

    onValue(ref(db,"receipts/"+props.activeTable.active_receipt_id), (snapshot)=>{
      const data = snapshot.val()
      if(data){
        setDbOrderedFood(data.orderedFood)
        setTotalPrice(data.totalPrice)
        console.log(data)
      }
    })
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
                  <OrderedMenu list={dbOrderedFood} />
              </div>
              <h3 className='orders-total'>Your Total Rp.{totalPrice} </h3>
          </div>
      </>
    )


}

export default Cart