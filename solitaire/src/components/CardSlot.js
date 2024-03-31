import {useDroppable} from '@dnd-kit/core';
import Card from './Card';

function CardSlot({cardData, type, index, icon, handleClick}) {

    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
      });

    return (
        <div className={"empty-card" + ((icon === '\u2665' || icon === '\u2666') ?  " red-card"  : "")} onClick={handleClick}>
            {icon}
        </div>
    )
}
export default CardSlot