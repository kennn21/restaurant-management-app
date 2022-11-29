import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import config from '../config.json';

import { useEffect, useState, useRef } from 'react';

import { db } from '../database/firebase';
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";

function DisplayTables(props){

    const [tables, setTables] = useState([])


    useEffect(() => {
        onValue(ref(db,"tables"), (snapshot) => {
          setTables([])
          const data = snapshot.val()
          if(data){
            setTables(data)
          }
        })
      }, []);
      
// console.log(tables)
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
                  <Button variant="primary">Go to {table[1].name}</Button>
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