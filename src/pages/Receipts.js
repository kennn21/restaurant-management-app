import React from 'react'
import {useEffect,useState} from 'react'
import {db} from '../database/firebase'
import { onValue, ref } from 'firebase/database'
import DisplayNavbar from '../components/DisplayNavbar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import config from '../config.json'

function Receipts() {
  const [receipts, setReceipts] = useState([])
  useEffect(()=>{
    onValue(ref(db,"/receipts"), (snapshot=>{
      const data = snapshot.val()
      if(data){
        setReceipts(data)
        console.log(data)
      }
    }))
  })
  return (
    <div>
      <DisplayNavbar></DisplayNavbar>
      <Container className="container d-flex justify-content-evenly">
            <Row className='d-flex justify-content-evenly'>
      {Object.entries(receipts).map((receipt,index)=>{
        return(
          <>
              <Card style={{ width: '24rem' }} className="col-md-4" key={receipt[1].recID}>
              <Card.Img variant="top" src={config.table_image_url} />
              <Card.Body>
                <Card.Title>{receipt[1].recID}</Card.Title>
                <Card.Text>
                {Object.entries(receipt[1].orderedFood).map((food, index)=>{
                    return(
                        <>
                            <h6>{food[1].name} x {food[1].quantity}</h6>
                        </>
                    )
                })}
                <h4>IDR {receipt[1].totalPrice}</h4>
                </Card.Text>  
                </Card.Body>
              </Card>
          </>
        )
      })
      }
                  </Row>
          </Container>
    </div>
  )
}

export default Receipts
