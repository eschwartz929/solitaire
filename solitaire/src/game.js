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
                if (selectedCard.location === 'stacks' || selectedCard.location === 'discard') {

                    var source = selectedCard.location === 'stacks' ? stacks[selectedCard.locationIndex] : discardPile

                    if (card.location === 'stacks') {

                            if (card.color !== selectedCard.color && card.number === selectedCard.number + 1) {               
                                moveCard(source, stacks[card.locationIndex], card.location, card.locationIndex)         
                            }
    
    
                    } else if (card.location === 'piles') {

                        if (card.color === selectedCard.color && card.number === selectedCard.number - 1) {
                            moveCard(source, piles[card.suit].cards, card.location, card.locationIndex)
                        }
                    
                    }
                } else {
                    card.selected = false
                    setSelectedCard([])
                }

            }
        }
    }

    function moveCard(source, destination, location, locationIndex) {
            source.pop()
            if (source.length > 0) {
                source[source.length - 1].visible = true
            }
            selectedCard.location = location
            selectedCard.locationIndex = locationIndex                    
            selectedCard.selected = false
            destination.push(selectedCard)
            setStacks(stacks)
            setDiscardPile(discardPile)
            setPiles(piles)
            setSelectedCard([])
    }

    function startFoundation(suit) {
        if (selectedCard && selectedCard.number === 1 && selectedCard.suit === suit) {
            if (selectedCard.location === 'stacks') {
                moveCard(stacks[selectedCard.locationIndex], piles[suit].cards, 'piles', suit)
                setPiles(piles)
            } else if (selectedCard.location === 'discard') {
                moveCard(discardPile, piles[suit].cards, 'piles', suit)
                setPiles(piles)
            }
        }
    }

    function handleEmptyStack(index) {
        if (selectedCard && selectedCard.number === 13) {
            if (selectedCard.location === 'stacks') {
                moveCard(stacks[selectedCard.locationIndex], stacks[index], 'stacks', index)
            } else if (selectedCard.location === 'discard') {
                moveCard(discardPile, stacks[index], 'stacks', index)
            }
        }
    }


    return (
        <div className="game">
            {!activeGame && <button className="button" onClick={newGame}>New Game</button>}
            {activeGame && fullDeck.length > 1 && piles.length > 1 &&
                <Board 
                    deck={deck} 
                    discardPile={discardPile} 
                    drawCard={drawCard} 
                    selectCard={selectCard} 
                    piles={piles} 
                    stacks={stacks} 
                    startFoundation={startFoundation}
                    handleEmptyStack={handleEmptyStack}
                />
            }
        </div>
    )
}

export default Game;