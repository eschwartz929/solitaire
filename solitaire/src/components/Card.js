import {useEffect, useState} from 'react'
import "../css/Card.css"
import suits from "../config/suits"
import numbers from "../config/cardNumbers"

function Card({card, selectCard, stacked}) {
    const cardSuit = suits[card.suit]
    const cardLabel = numbers[card.number]

    return (
        <>
        {cardSuit && cardLabel && 
            <div 
                onClick={() => selectCard(card)} 
                className={'card' 
                    + (!card.visible ? ' hidden-card ' : '') 
                    + (card.color === 'red' ? ' red-card': '') 
                    + (card.selected ? ' selected-card': '')
                    + (stacked ? ' stacked-card' : '')} >
                <div className="card-header">{cardLabel} {cardSuit}</div>
                {!stacked && <div className="card-suit">{cardSuit}</div>}
            </div>
        }   
        </>
    )
}

export default Card