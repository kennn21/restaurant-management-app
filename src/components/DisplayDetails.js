import { Container } from "react-bootstrap"
import { useState, useEffect } from "react"

import { db } from '../database/firebase'
import { ref, onValue, update } from "firebase/database"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom";

//Brief stylings for some JSX elements
var textStyle = {
    color: "white"
}

var popUpCancelBtnStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
}

var tableStatusNegativeStyle = {
    color : "red",
    fontWeight : "bold"
}

var tableStatusPositiveStyle = {
    color : "lightgreen",
    fontWeight : "bold"
}


function DisplayDetails(props) {
    //Declares States
    const [selectedTable, setSelectedTable] = useState([])
    const [receiptFood, setReceiptFood] = useState({})
    const [price, setPrice] = useState(0)

    //Gets table data from db, whilst joining it with receipt data to get the updated ordered food data if it changes in db
    useEffect(() =>{
        onValue(ref(db,"tables"), (snapshot) => {
            setSelectedTable([])
            const data = snapshot.val()
            Object.entries(data).map((table,i)=>{
                if(table[1].id == props.activeTableId){
                    setSelectedTable(table[1])
                    onValue(ref(db,"receipts/"+table[1].active_receipt_id), (snapshot) => {
                        setReceiptFood({})
                        const data = snapshot.val()
                        if(data){
                          setReceiptFood(data.orderedFood)
                          setPrice(data.totalPrice)
                        }
                    })
                }
            })
        })

    }
    ,[])


    //Change the status of a finished table, whilst turns the active receipt foreign key to inactive(false)
    const finishTable = ()=>{
        let id = props.activeTableId
        let status = 0
        update(ref(db, '/tables/'+id), {
            status: status,
            active_receipt_id: "inactive"
        })
        props.disableIsPopUp()
    }

    //Converts status from a form of numbers to words
    var convertStatus = (status)=>{
        switch(status) {
            case 0:
              return <h6 style={tableStatusPositiveStyle}>Available</h6>
            case 1:
              return <h6 style={tableStatusNegativeStyle}>Reserved</h6>
            default:
              return <h6 style={tableStatusNegativeStyle}>Reserved</h6>
          }
    }

    //Conditionally renders a button if the table status is Reserved(Code 1)
    var buttonFinish = (table) =>{
        if(table == 1){
            return(
                <Button onClick={()=>{finishTable()}}>Finish table</Button>
            )
        }
        return(<></>)
    }

    //Renders a popup if the popup is true
    if(props.isPopUp){
        return(
            <Container style={textStyle} className="bg-dark text-center rounded">
                <h1>{selectedTable.name}</h1>
                {convertStatus(selectedTable.status)}
                {console.log('a')}
                {console.log(selectedTable.active_receipt_id)}
                {Object.entries(receiptFood).map((food, index)=>{
                    return(
                        <>
                            <h6>{food[1].name} x {food[1].quantity}</h6>
                        </>
                    )
                })}
                <div>{price}</div>
                <button style={popUpCancelBtnStyle} className="btn btn-danger" onClick={props.disableIsPopUp}>x</button>
                <div className="d-flex justify-content-between align-middle">
                    <Col className="">
                    {
                    buttonFinish(selectedTable.status)
                }
                    <Link to ="/receipts" className="btn btn-primary m-1">Receipts</Link>
                    </Col>


                </div>

            </Container>
        )
    }else{
        return (
            <div></div>
        );
    }
}

export default DisplayDetails