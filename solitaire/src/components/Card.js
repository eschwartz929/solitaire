import {useEffect, useState} from 'react'
import "../css/Card.css"
import suits from "../config/suits"
import numbers from "../config/cardNumbers"

function Card({card, selectCard}) {
    const cardSuit = suits[card.suit]
    const cardLabel = numbers[card.number]
    const red = (card.suit % 2 === 1)

    return (
        <>
        {cardSuit && cardLabel && 
            <div onClick={() => selectCard(card)} className={'card' + (!card.visible ? ' hidden-card ' : '') + (red ? ' red-card': '') + (card.selected ? ' selected-card': '')} >
                {cardLabel} {cardSuit}
            </div>
        }   
        </>
    )
}

export default Card