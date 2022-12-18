import { Container } from "react-bootstrap"
import { useState, useEffect } from "react"

import { db } from '../database/firebase'
import { uid } from "uid"
import { set, ref, onValue, remove, update, Database } from "firebase/database"
import { async } from "@firebase/util"
import userEvent from "@testing-library/user-event"
import Button from "react-bootstrap/Button"


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
    console.log("props")
    console.log(props)
    const [selectedTable, setSelectedTable] = useState([])
    const [receipts, setReceipts] = useState([])
    const [selectedReceipt, setSelectedReceipt] = useState({})
    const [tableStatus, setTableStatus] = useState()
    const [orderedFoods, setOrderedFoods] = useState([])

    useEffect(() =>{
        onValue(ref(db,"tables"), (snapshot) => {
            setSelectedTable([])
            const data = snapshot.val()
            Object.entries(data).map((table,i)=>{
                if(table[1].id == props.activeTableId){
                    setSelectedTable(table[1])
                }
            })
        })
        onValue(ref(db,"receipts/"+selectedTable.active_receipt_id), (snapshot) => {
            setReceipts([])
            const data = snapshot.val()
            if(data){
              setReceipts(data)
              console.log(data)
            }
            console.log(data)
        })
    }
    ,[])

    Object.entries(receipts).map((receipt)=>{
        console.log("receipt")
        console.log(receipt)
    })


    const changeTableStatus = ()=>{
        let id = props.activeTableId
        let status = 0
        update(ref(db, '/tables/'+id), {
            status: status,
            active_receipt_id: "inactive"
        })
        props.disableIsPopUp()
    }


    var convertStatus = (status)=>{
        switch(status) {
            case 0:
              return <h6 style={tableStatusPositiveStyle}>Available</h6>
              break;
            case 1:
              return <h6 style={tableStatusNegativeStyle}>Reserved</h6>
              break;
            default:
              return <h6 style={tableStatusNegativeStyle}>Reserved</h6>
          }
    }

    var buttonFinish = (table) =>{
        if(table == 1){
            return(
                <Button onClick={()=>{changeTableStatus()}}>Finish table</Button>
            )
        }
        return(<></>)
    }

    if(props.isPopUp){
        return(
            <Container style={textStyle} className="bg-dark text-center rounded">
                <h1>{selectedTable.name}</h1>
                {convertStatus(selectedTable.status)}
                {/* {selectedReceipt.orderedFood.map((food, index)=>{
                    return(
                        <>
                            <h6>{food.name} x {food.quantity}</h6>
                        </>
                    )
                })} */}
                <button style={popUpCancelBtnStyle} className="btn btn-danger" onClick={props.disableIsPopUp}>x</button>
                {
                    buttonFinish(selectedTable.status)
                }
            </Container>
        )
    }else{
        return (
            <div></div>
        );
    }
}

export default DisplayDetails