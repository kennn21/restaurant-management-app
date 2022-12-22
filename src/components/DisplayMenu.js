import { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "../database/firebase"
import { Container } from "react-bootstrap"
import { menuItemsData } from './Menu/data'
import Menu from "./Menu"

function DisplayMenu(props) {
    const [cartList, setCartList] = useState([{}])
    const [isPopUp, setIsPopUp] = useState(false)
    const [activeTable, setActiveTable] = useState({})

    const togglePopUp = () => {
      setIsPopUp(!isPopUp)
      console.log(isPopUp)
    }

    useEffect(() => {
        onValue(ref(db, "/tables/"+props.activeTable.id),(snapshot)=>{
            const data = snapshot.val()
            if(data){
              setActiveTable(data)
              console.log(data)
            }
        })
    }, [cartList, setCartList])

    const triggerUpdate = (updatedCartList)=>{
        setCartList(updatedCartList)
    }

    if (props.isPopUp) {
        return (
            <>
                <Container className="center bg-white text-center rounded">
                    <Menu
                        list={menuItemsData}
                        triggerUpdate = {triggerUpdate}
                        isPopUp = {isPopUp}
                        togglePopUp = {togglePopUp}
                        cartList = {cartList}
                        activeTable = {activeTable}
                    />
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