import {useEffect, useState} from 'react'
import "../css/Card.css"
import suits from "../config/suits"
import numbers from "../config/cardNumbers"

function Card({suit, number, visible}) {
    const cardSuit = suits[suit]
    const cardLabel = numbers[number]

    return (
        <>
        {cardSuit && cardLabel && 
            <div className={visible ? 'card' : 'card hidden-card'} >
                {cardLabel} of {cardSuit}
            </div>
        }   
        </>
    )
}

export default Card