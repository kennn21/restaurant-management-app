import React from 'react'
import DisplayAvailableTables from '../components/DisplayAvailableTables'
import DisplayNavbar from '../components/DisplayNavbar'

function Client() {
  
  //A View Structure for Client Side View
  return (
    <>
    <DisplayNavbar></DisplayNavbar>
    <DisplayAvailableTables></DisplayAvailableTables>
    </>
  )
}

export default Client