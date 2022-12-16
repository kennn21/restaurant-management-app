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

    const [selectedTable, setSelectedTable] = useState([])
    const [selectedReceipt, setSelectedReceipt] = useState([])
    const [selectedFood, setSelectedFood] = useState([])
    const [tableStatus, setTableStatus] = useState()

    var ordered_foods = []

    useEffect(() =>{
        Object.entries(props.receipts).map((receipt) =>{
            if(receipt[1].table_id == props.activeTableId){
                var data = receipt[1]
                setSelectedReceipt(data)
                setSelectedFood(data.ordered_foods)
            }
        })

        onValue(ref(db,"tables"), (snapshot) => {
            setSelectedTable([])
            const data = snapshot.val()
            Object.entries(data).map((table,i)=>{
                if(table[1].id == props.activeTableId){
                    setSelectedTable(table[1])
                }
            })
          })
    }
    ,[])
    
    Object.entries(props.foods).map((food) =>{
        Object.entries(selectedFood).map((f) =>{
            if(food[1].id == f[1]){
                ordered_foods.push(food[1])
            }
        })
    })

    const changeTableStatus = ()=>{
        let id = props.activeTableId
        let status = 0
        update(ref(db, '/tables/'+id), {
            status: status
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
                {ordered_foods.map((food,index)=>{
                    return(
                        <p key={food.id}>{food.name}</p>
                    )
                })}
                {convertStatus(selectedTable.status)}
                {/* <button onClick={()=>{changeTableStatus(props.activeTable)}}>Change reservation status</button> */}
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