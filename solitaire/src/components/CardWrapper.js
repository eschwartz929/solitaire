import React from 'react'
import {useDraggable} from '@dnd-kit/core'

function CardWrapper(props) {
  const Element = props.element || 'div'
  const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    id: props.card.number + '-' + props.card.suit,
    data: {
        cards: [props.card],
        type: props.card.number + '-' + props.card.suit,
        index: props.cardIndex
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
} : undefined;
  
  return (
    <Element 
      ref={setNodeRef}
      style={{...style, zIndex: isDragging ? 1 : 0}}
      {...listeners} 
      {...attributes}>
      {props.children}
    </Element>
  )
}

export default CardWrapper