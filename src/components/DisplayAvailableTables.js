import React, { useEffect, useState } from 'react'
import DisplayMenu from './DisplayMenu'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import config from '../config.json';

import { db } from '../database/firebase';
import {ref, onValue, update, set} from "firebase/database";
import Menu from './Menu';

function DisplayAvailableTables() {

    const [tables, setTables] = useState([])
    const [foods, setFoods] = useState([])
    const [receipts, setReceipts] = useState([])
    const [activeTable, setActiveTable] = useState([])
    const [isPopUp, setIsPopUp] = useState(false)

    useEffect(() => {
        onValue(ref(db,"tables"), (snapshot) => {
            setTables([])
            const data = snapshot.val()
            if(data){
              setTables(data)
            }
          })

          onValue(ref(db, "foods"), (snapshot) => {
            setFoods([])
            const data = snapshot.val()
            if(data) {
                setFoods(data)
            }
        })

        onValue(ref(db,"receipts"), (snapshot) => {
            setReceipts([])
            const data = snapshot.val()
            if(data){
              setReceipts(data)
            }
          })
    }, [])

    const changeTableStatus = (x)=>{
      let id = x.id
      let activeReceipt = x.active_receipt_id
      let status = x.status
      if(status === 0){
        //change table status (DONE)
        status = 1
        //get number of receipt children (DONE)
        let receiptNumber = 0
        Object.entries(receipts).map((receipt, i) =>{
          receiptNumber++
          console.log(receiptNumber)
        })
        receiptNumber = (receiptNumber + 1).toString()
        let recName = "rec"+receiptNumber
        //create receipt (DONE)
        set(ref(db, '/receipts/'+recName), {
          recID: recName,
          orderedFood: "",
          totalPrice: 0
        })
        //assign receipt (DONE)
        let currReceipt = recName
        update(ref(db, '/tables/'+id), {
          status: status,
          active_receipt_id: currReceipt
        })
          status = 1
      }
    }

    var handle_table_button_click = (x, y) => {
        setActiveTable(x)
        setIsPopUp(y)
        changeTableStatus(x)
    }

    var disableIsPopUp = () => {
        setIsPopUp(false)
      }

      // if(isPopUp) {
      //   return (
      //       <DisplayMenu
      //       activeTable={activeTable}
      //       foods={foods}
      //       receipts={receipts}
      //       isPopUp={isPopUp}
      //       disableIsPopUp={disableIsPopUp}
      //       />
      //   )
      // }

      if(isPopUp) {
        return (
          <DisplayMenu
          activeTable={activeTable}
          foods={foods}
          receipts={receipts}
          isPopUp={isPopUp}
          disableIsPopUp={disableIsPopUp}
          />
        )
      }

  return (
    <>
     <Container className="container d-flex justify-content-evenly">
      <Row className='d-flex justify-content-evenly'>
    {Object.entries(tables).map((table, i) =>{
      // console.log(table[1])
      return(
        <Card style={{ width: '24rem' }} className="col-md-4" key={table[1].id}>
        <Card.Img variant="top" src={config.table_image_url} />
        <Card.Body>
          <Card.Title>{table[1].name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.w
          </Card.Text>  
            <Button variant="primary" onClick={()=>{
                handle_table_button_click(
                  table[1],
                  true
                  )

                }
              }>Book {table[1].name}</Button>
          </Card.Body>
        </Card>
      )
    })}
      </Row>
    </Container>
  </>
  )
}

export default DisplayAvailableTables