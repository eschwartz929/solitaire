import "../css/Card.css"
import "../css/EmptyCard.css"

function EmptyCard({icon, handleClick, hidden}) {

    return (
        <div className={"empty-card" + (hidden ? ' hidden-card' : '') + ((icon === '\u2665' || icon === '\u2666') ?  " red-card"  : "")} onClick={handleClick}>
            {icon}
        </div>
    )
}
export default EmptyCard