import { useState } from "react"

function Game() {
    const [activeGame, setActiveGame] = useState(false)

    function newGame() {
        setActiveGame(true)
        deal()
    }

    function deal() {

    }

    return (
        <div>
            {!activeGame && <button className="button" onClick={newGame}>New Game</button>}
        </div>
    )
}

export default Game;