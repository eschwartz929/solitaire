import {useEffect, useState} from 'react'
import "../css/Card.css"
import suits from "../config/suits"
import numbers from "../config/cardNumbers"

function Card({suit, number, visible}) {
    const cardSuit = suits[suit]
    const cardLabel = numbers[number]
    const red = (suit % 2 === 1)

    return (
        <>
        {cardSuit && cardLabel && 
            <div className={visible ? 'card' : 'card hidden-card'} >
                <div className={red ? 'red-card': ''}>
                    {cardLabel} {cardSuit}
                </div>
            </div>
        }   
        </>
    )
}

export default Card