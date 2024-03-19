import {useEffect, useState} from 'react'
import "../css/Card.css"
import suits from "../config/suits"
import numbers from "../config/cardNumbers"

function Card({card, selectCard, stacked, index}) {
    const [cardSuit, setCardSuit] = useState(0)
    const [cardLabel, setCardLabel] = useState('')
    useEffect(() => {
        if (card) {
            setCardSuit(suits[card.suit])
            setCardLabel(numbers[card.number])
        }
    }, [card])

    function handleClick() {
        if (index) {
            selectCard(card, index)
        } else {
            selectCard(card, 0)
        }
    }

    return (
        <>
        {cardSuit && cardLabel && 
            <div 
                onClick={handleClick} 
                className={'card' 
                    + (!card.visible ? ' hidden-card ' : '') 
                    + (card.color === 'red' ? ' red-card': '') 
                    + (card.selected ? ' selected-card': '')
                    + (stacked ? ' stacked-card' : '')} >
                {card.visible && <div className="card-header">{cardLabel} {cardSuit}</div>}
                {!stacked && card.visible && <div className="card-suit">{cardSuit}</div>}
            </div>
        }   
        </>
    )
}

export default Card