import {useEffect, useState} from 'react'
import "../css/Card.css"
import suits from "../config/suits"
import numbers from "../config/cardNumbers"
import {useDraggable} from '@dnd-kit/core';

function Card({card, selectCard, stacked, index, hidden, highlighted}) {
    const [cardSuit, setCardSuit] = useState('')
    const [cardLabel, setCardLabel] = useState('')

    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: stacked 
            ? card.location + '-' + card.locationIndex + '-draggable' 
            : card.number + '-' + card.suit + 'draggable',
        data: {
            number: card.number,
            suit: card.suit,
            type: card.number + '-' + card.suit
        }
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
        {cardSuit && cardLabel && card.visible &&
            <div 
                onClick={handleClick}
                ref={setNodeRef} 
                {...listeners} 
                {...attributes}
                style={{...style, zIndex: isDragging ? 1 : 0}}
                className={'card' 
                    + (card.color === 'red' ? ' red-card' : '') 
                    + ((card.selected || highlighted) ? ' selected-card' : '')
                    + (stacked ? ' stacked-card' : '')
                    + (hidden ? ' hidden-card' : '')
                } >
                <div className="card-header">{cardLabel} {cardSuit}</div>
                {card && <div className="card-suit">{cardSuit}</div>}
            </div>
        }

        {cardSuit && cardLabel && !card.visible && 
            <div 
                onClick={handleClick}
                className={'card flipped-card' 
                    + (stacked ? ' stacked-card' : '')} >
            </div>
        } 
        </>
    )
}

export default Card