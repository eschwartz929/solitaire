import { useEffect, useState } from "react"
import Card from "./components/Card"
import Board from "./Board.js"

function Game() {
    const [activeGame, setActiveGame] = useState(false)
    const [fullDeck, setFullDeck] = useState([])
    const [deck, setDeck] = useState([])
    const [discardPile, setDiscardPile] = useState([])
    const [stacks, setStacks] = useState([])

    useEffect(() => {
        if (fullDeck.length === 0) {

            for (var i = 1; i < 14; i++) {

                for (var j = 0; j < 4; j++) {
                    fullDeck.push({suit: j, number: i, visible: false})
                }

            }
            setFullDeck(fullDeck)
        }

    }, [fullDeck])

    function newGame() {
        setActiveGame(true)
        shuffle()
    }

    function shuffle() {
        var tempDeck = fullDeck
        for (let i = tempDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempDeck[i], tempDeck[j]] = [tempDeck[j], tempDeck[i]];
        }
        setFullDeck(tempDeck)
        deal()
    }

    function deal() {
        var initStacks = []
        var stackIndex = 0
        var cardsPerStack = 0

        console.log('deck: ', fullDeck)

        for (var i = 0; i < 28; i++) {

            if (!stacks[stackIndex]) stacks[stackIndex] = []

            var card = fullDeck[i]

            if (cardsPerStack === stackIndex) {
                card.visible = true
                stacks[stackIndex].push(card)
                stackIndex++
                cardsPerStack = 0
            } else {
                stacks[stackIndex].push(card)
                cardsPerStack++
            }
        }
        for (var i = 28; i < 51; i++) {
            deck.push(fullDeck[i])
        }
        discardPile.push(fullDeck[51])
        console.log('init stacks:', stacks)
        console.log('deckk:', deck)
        setStacks(stacks)
        setDeck(deck)
    }

    return (
        <div className="game">
            {!activeGame && <button className="button" onClick={newGame}>New Game</button>}
            {activeGame && fullDeck.length > 1 && 
                // deck.map((card, index) => <Card key={index} suit={card.suit} number={card.number}></Card>)
                // }
                <Board deck={deck} discardPile={discardPile} stacks={stacks}></Board>}
        </div>
    )
}

export default Game;