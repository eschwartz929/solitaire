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
        for (var i = 0; i < selectedCard.length; i++) {
            selectedCard[i].selected = false
            setSelectedCard([])
        }
        var nextCard = deck.pop()
        nextCard.visible = true
        nextCard.location = 'discard'
        discardPile.push(nextCard)
        setDeck(deck)
        setDiscardPile(discardPile)
    }

    function selectCard(card, stackIndex) {
        if (card.visible) {

            if (card.location === 'stacks' && selectedCard.length > 0 && stackIndex === stacks[card.locationIndex].length - 1
                    && card.color !== selectedCard[0].color && card.number === selectedCard[0].number + 1) {

                var source = []

                switch(selectedCard[0].location) {
                    case 'stacks':
                        source = stacks[selectedCard[0].locationIndex]
                    case 'discard':
                        source = discardPile
                    case 'piles':
                        source = piles[selectedCard[0].locationIndex]
                }

                var source = selectedCard[0].location === 'stacks' ? stacks[selectedCard[0].locationIndex] : discardPile
                var destination = stacks[card.locationIndex]

                moveCard(source, destination, card.location, card.locationIndex)

            } else if (card.location === 'piles' && selectedCard.length === 1 && (selectedCard[0].location === 'stacks' || selectedCard[0].location === 'discard')
                    && card.color === selectedCard[0].color && card.number === selectedCard[0].number - 1) {

                var source = selectedCard[0].location === 'stacks' ? stacks[selectedCard[0].locationIndex] : discardPile
                var destination = piles[card.locationIndex].cards

                moveCard(source, destination, card.location, card.locationIndex)

            } else {
                for (var i = 0; i < selectedCard.length; i++) {
                    selectedCard[i].selected = false
                }

                if (card.location === 'stacks') {

                    var currentStack = stacks[card.locationIndex]
                    var cardArr = []
                    for (var i = stackIndex; i < currentStack.length; i++) {
                        currentStack[i].selected = true
                        cardArr.push(currentStack[i])
                    }
                    setSelectedCard(cardArr)

                } else {
                    card.selected = true
                    setSelectedCard([card])
                }
            }

        } else {
            for (var i = 0; i < selectedCard.length; i++) {
                selectedCard[i].selected = false
            }
            setSelectedCard([])
        }
    }

    function moveCard(source, destination, location, locationIndex) {
            for (var i = 0; i < selectedCard.length; i++) {
                source.pop()
                selectedCard[i].location = location
                selectedCard[i].locationIndex = locationIndex                    
                selectedCard[i].selected = false
                destination.push(selectedCard[i])
            }
            if (source.length > 0) {
                source[source.length - 1].visible = true
            }

            setStacks(stacks)
            setDiscardPile(discardPile)
            setPiles(piles)
            setSelectedCard([])
    }

    function startFoundation(suit) {
        if (selectedCard && selectedCard.length === 1 && selectedCard[0].number === 1 && selectedCard[0].suit === suit) {
            if (selectedCard[0].location === 'stacks') {
                moveCard(stacks[selectedCard[0].locationIndex], piles[suit].cards, 'piles', suit)
                setPiles(piles)
            } else if (selectedCard[0].location === 'discard') {
                moveCard(discardPile, piles[suit].cards, 'piles', suit)
                setPiles(piles)
            }
        }
    }

    function handleEmptyStack(index) {
        if (selectedCard && selectedCard.length === 1 && selectedCard[0].number === 13) {
            if (selectedCard[0].location === 'stacks') {
                moveCard(stacks[selectedCard[0].locationIndex], stacks[index], 'stacks', index)
            } else if (selectedCard[0].location === 'discard') {
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