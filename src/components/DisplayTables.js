import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import DisplayDetails from './DisplayDetails';
import config from '../config.json';

import { useEffect, useState, useRef } from 'react';

import { db } from '../database/firebase';
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";

function DisplayTables(props){

    const [tables, setTables] = useState([])
    const [activeTable, setActiveTable] = useState([])
    const [foods, setFoods] = useState([])
    const [receipts, setReceipts] = useState([])
    const [isPopUp, setIsPopUp] = useState(false)

    useEffect(() => {
        onValue(ref(db,"tables"), (snapshot) => {
          setTables([])
          const data = snapshot.val()
          if(data){
            setTables(data)
          }
        })

        onValue(ref(db,"foods"), (snapshot) => {
          setFoods([])
          const data = snapshot.val()
          if(data){
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

      }, []);

    var handle_table_button_click = (x) => {
      setActiveTable(x)
      setIsPopUp(true)
    }

    var disableIsPopUp = () => {
      setIsPopUp(false)
    }
    

// console.log(tables)
    if(isPopUp) {
      return (
        <DisplayDetails
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
                  bulk of the card's content.
                </Card.Text>  
                  <Button variant="primary" onClick={()=>{
                      handle_table_button_click(
                        table[1]
                        )
                      }
                    }>Go to {table[1].name}</Button>
                </Card.Body>
              </Card>
            )
          })}
            </Row>
          </Container>
        </>
    )
}
export default DisplayTables;