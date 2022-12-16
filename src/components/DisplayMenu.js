import { useState, useEffect } from "react"
import { ref, onValue, set } from "firebase/database"
import { db } from "../database/firebase"
import ListGroup from 'react-bootstrap/ListGroup'
import { Container } from "react-bootstrap"
import { menuItemsData } from './Menu/data'
import Menu from "./Menu"

function DisplayMenu(props) {

    const [selectedFood, setSelectedFood] = useState([])
    const [selectedReceipt, setSelectedReceipt] = useState([])
    const [foodQty, setFoodQty] = useState(0)

    var order_foods = []

    useEffect(() => {
        Object.entries(props.receipts).map((receipt) => {
            if (receipt[1].table_id == props.activeTable.id) {
                var data = receipt[1]
                setSelectedReceipt(data)
                setSelectedFood(data.ordered_foods)
            }
        })
    }, [])

    Object.entries(props.foods).map((food) => {
        Object.entries(selectedFood).map((sFood) => {
            if (food[1].id == sFood[1]) {
                order_foods.push(food[1])
                // set(ref(db, "receipts/rec2/ordered_foods"), {order_foods})
                // console.log(selectedReceipt.id)
            }
        })
    })

    const createReceipt = () => {

        let id =
            set(ref(db, '/receipts'), {
                // id: id
            })
    }

    var confirm_order_foods = () => {
        //console.log(order_foods)
        //set(ref(db, "receipts/rec2/ordered_foods"), {order_foods})
        //set(ref(db, "receipts/" + selectedReceipt.id + "/ordered_foods"), order_foods)
        //console.log(selectedReceipt.id)
    }

    if (props.isPopUp) {
        return (
            <>
                <Container className="center bg-white text-center rounded">
                    <Menu list={menuItemsData} />
                    <button onClick={createReceipt}>Order</button>
                </Container>
            </>
        )
    } else {
        return (
            <></>
        )
    }

}

export default DisplayMenu