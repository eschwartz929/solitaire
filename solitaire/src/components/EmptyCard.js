import "../css/EmptyCard.css"

function EmptyCard({icon, handleClick}) {

    return (
        <div className="empty-card" onClick={handleClick}>
            {icon}
        </div>
    )
}
export default EmptyCard