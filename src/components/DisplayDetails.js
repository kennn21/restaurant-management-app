import { Container } from "react-bootstrap"
import { useState, useEffect } from "react"

import { db } from '../database/firebase'
import { uid } from "uid"
import { set, ref, onValue, remove, update } from "firebase/database"



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

    const [selectedTable, setSelectedTable] = useState("")
    const [selectedReceipt, setSelectedReceipt] = useState([])
    const [selectedFood, setSelectedFood] = useState([])

    var ordered_foods = []

    useEffect(() =>{
        Object.entries(props.receipts).map((receipt) =>{
            if(receipt[1].table_id == props.activeTable.id){
                var data = receipt[1]
                setSelectedReceipt(data)
                setSelectedFood(data.ordered_foods)
            }
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

    var change_table_status = ()=>{
        console.log("Changing status of " + props.activeTable.name)
    }

    var convertStatus = (status)=>{
        switch(status) {
            case 0:
              return <h6 onClick={change_table_status} style={tableStatusPositiveStyle}>Available</h6>
              break;
            case 1:
              return <h6 onClick={change_table_status} style={tableStatusNegativeStyle}>Reserved</h6>
              break;
            default:
              return <h6 onClick={change_table_status} style={tableStatusNegativeStyle}>Reserved</h6>
          }
    }

    if(props.isPopUp){
        return(
            <Container style={textStyle} className="bg-dark text-center rounded">
                <h1>{props.activeTable.name}</h1>
                {ordered_foods.map((food,index)=>{
                    return(
                        <p key={food.id}>{food.name}</p>
                    )
                })}

                {convertStatus(props.activeTable.status)}
                <button style={popUpCancelBtnStyle} className="btn btn-danger" onClick={props.disableIsPopUp}>x</button>
            </Container>
        )
    }else{
        return (
            <div></div>
        );
    }
}

export default DisplayDetails