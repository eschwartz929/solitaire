import { useEffect, useState } from "react"
import Card from "./components/Card"

function Game() {
    const [activeGame, setActiveGame] = useState(false)
    const [deck, setDeck] = useState([])

    useEffect(() => {
        if (deck.length === 0) {
            const initDeck = []
            for (var i = 1; i < 14; i++) {
                for (var j = 0; j < 4; j++) {
                    initDeck.push({suit: j, number: i})
                }
            }
            setDeck(initDeck)
        }

    }, [deck])

    function newGame() {
        setActiveGame(true)
        shuffle()
    }

    function shuffle() {
        var tempDeck = deck
        for (let i = tempDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempDeck[i], tempDeck[j]] = [tempDeck[j], tempDeck[i]];
        }
        setDeck(tempDeck)
    }

    return (
        <div>
            {!activeGame && <button className="button" onClick={newGame}>New Game</button>}
            {activeGame && deck.length > 1 && 
                deck.map((card, index) => <Card key={index} suit={card.suit} number={card.number}></Card>)
                }
            {/* <Card suit={0} number={12}></Card> */}
        </div>
    )
}

export default Game;