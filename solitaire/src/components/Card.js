import {useEffect, useState} from 'react'
import "../css/Card.css"
import suits from "../config/suits"
import numbers from "../config/cardNumbers"
import {useDraggable} from '@dnd-kit/core';

function Card({card, selectCard, stacked, index, hidden}) {
    const [cardSuit, setCardSuit] = useState('')
    const [cardLabel, setCardLabel] = useState('')

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: card.number + '-' + card.suit + '-draggable',
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    
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
                // ref={setNodeRef} style={style} {...listeners} {...attributes}
                className={'card' 
                    + (!card.visible || hidden ? ' hidden-card' : '') 
                    + (card.color === 'red' ? ' red-card' : '') 
                    + (card.selected ? ' selected-card' : '')
                    + (stacked ? ' stacked-card' : '')} >
                {card && card.visible && <div className="card-header">{cardLabel} {cardSuit}</div>}
                {!stacked && card && card.visible && <div className="card-suit">{cardSuit}</div>}
            </div>
        }   
        </>
    )
}

export default Card