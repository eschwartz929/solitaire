import { useEffect, useState } from "react"
import Card from "./components/Card"
import Board from "./Board.js"

function Game() {
    const [activeGame, setActiveGame] = useState(false)
    const [fullDeck, setFullDeck] = useState([])
    const [deck, setDeck] = useState([])
    const [discardPile, setDiscardPile] = useState([])
    const [stacks, setStacks] = useState([])
    const [piles, setPiles] = useState([{suit: 0, cards: []}, {suit: 1, cards: []}, {suit: 2, cards: []}, {suit: 3, cards: []}])
    const [selectedCard, setSelectedCard] = useState([])

    useEffect(() => {
        if (fullDeck.length === 0) {

            for (var i = 1; i < 14; i++) {

                for (var j = 0; j < 4; j++) {
                    var color = j % 2 === 0 ? 'black' : 'red'
                    fullDeck.push({suit: j, number: i, visible: false, color: color})
                }

            }
            setFullDeck(fullDeck)
        }

    }, [fullDeck])

    // useEffect(() => {
    //     if (piles.length === 0) {
    //         setPiles([{suit: 0, cards: []}, {suit: 1, cards: []}, {suit: 2, cards: []}, {suit: 3, cards: []}])
    //     }

    // }, [piles])

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
        var stackIndex = 0
        var cardsPerStack = 0

        for (var i = 0; i < 28; i++) {

            if (!stacks[stackIndex]) stacks[stackIndex] = []

            var card = fullDeck[i]
            card.location = 'stacks'
            card.locationIndex = stackIndex

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
            var card = fullDeck[i]
            card.location = 'deck'
            card.locationIndex = 0
            deck.push(card)
        }

        fullDeck[51].visible = true
        fullDeck[51].location = 'discard'
        fullDeck[51].locationIndex = 0
        discardPile.push(fullDeck[51])
        setStacks(stacks)
        setDeck(deck)
        setDiscardPile(discardPile)
    }

    function drawCard() {
        if (selectedCard.length === 0) {
            var nextCard = deck.pop()
            nextCard.visible = true
            nextCard.location = 'discard'
            discardPile.push(nextCard)
            setDeck(deck)
            setDiscardPile(discardPile)
        }
    }

    function selectCard(card) {
        if (card.visible) {
            if (selectedCard.length === 0) {
                card.selected = true
                setSelectedCard(card)
            } else {
                if (card.location === 'stacks') {

                    if (selectedCard.location === 'stacks') {
                        if (card.locationIndex !== selectedCard.locationIndex) {
                            moveCard(card, stacks[selectedCard.locationIndex], stacks[card.locationIndex])
                        }
                    } else if (selectedCard.location === 'discard') {
                        moveCard(card, discardPile, stacks[card.locationIndex])
                    }
                    selectedCard.selected = false
                    setSelectedCard([])
                }
            }
        }
    }

    function moveCard(card, source, destination) {
        if (card.color !== selectedCard.color && card.number === selectedCard.number + 1) {
            source.pop()
            if (source.length > 0) {
                source[source.length - 1].visible = true
            }
            selectedCard.location = card.location
            selectedCard.locationIndex = card.locationIndex
            destination.push(selectedCard)
            setStacks(stacks)
            setDiscardPile(discardPile)
        } 
    }


    return (
        <div className="game">
            {!activeGame && <button className="button" onClick={newGame}>New Game</button>}
            {activeGame && fullDeck.length > 1 && piles.length > 1 &&
                <Board deck={deck} discardPile={discardPile} drawCard={drawCard} selectCard={selectCard} piles={piles} stacks={stacks}></Board>}
        </div>
    )
}

export default Game;