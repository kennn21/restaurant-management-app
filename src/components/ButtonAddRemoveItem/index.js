import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


const ButtonAddRemoveItem = (props) => {
  return (
    <div className='btnAddRemove'>
        {props.quantity !=0 ? 
        (<div className='btnAddRemove-positive'>
            <FontAwesomeIcon icon={faMinus} onClick={props.handleRemoveItem}/>
            <span>{props.quantity}</span>
            <FontAwesomeIcon icon={faPlus} onClick={props.handleAddItem}/>
        </div>
        ) : (
        <div className='btnAddRemove-negative' onClick={props.handleAddItem}>
            <span>{props.quantity}</span>
            <FontAwesomeIcon icon={faPlus} onClick={props.handleAddItem}/>
        </div>
            )}
    </div>
  )
}

export default ButtonAddRemoveItem