import {useDroppable} from '@dnd-kit/core';
import Card from './Card';

function CardSlot({cardData, type, index}) {

    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
      });

    return (
        <div>

        </div>
    )
}