import { Container } from "react-bootstrap"
import { useState, useEffect } from "react"

import { db } from '../database/firebase'
import { uid } from "uid"
import { set, ref, onValue, remove, update } from "firebase/database"

var textStyle = {
    color: "white",
}

var popUpCancelBtnStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
}

function DisplayDetails(props) {
    const [selectedTable, setSelectedTable] = useState("")
    console.log(props.isPopUp)
    if(props.isPopUp){
        return(
            <>
            <div id="overlay"></div>
            <Container className="bg-dark text-center rounded">
                <h1 style={textStyle}>{props.activeTable.name}</h1>
                <button style={popUpCancelBtnStyle} className="btn btn-danger" onClick={props.disableIsPopUp}>x</button>
            </Container>
            </>
        )
    }else{
        return (
            <div></div>
        );
    }
}

export default DisplayDetails