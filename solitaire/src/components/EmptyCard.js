import "../css/EmptyCard.css"

function EmptyCard({icon, handleClick}) {

    return (
        <div className={"empty-card" + ((icon === '\u2665' || icon === '\u2666') ?  " red-card"  : "")} onClick={handleClick}>
            {icon}
        </div>
    )
}
export default EmptyCard