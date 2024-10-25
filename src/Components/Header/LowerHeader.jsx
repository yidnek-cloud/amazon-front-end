import React from 'react'
import { MdOutlineMenu } from "react-icons/md";
import classes from"./Header.module.css"


function LowerHeader() {
  return (
    <div className={classes.lower__container}>
        <ul>
            <li className={classes.all}>
            <MdOutlineMenu />
                <p>All</p>
            </li>
            <li>Todays's Deals</li>
            <li>Costumer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
        </ul>
    </div>
  )
}

export default LowerHeader