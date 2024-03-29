import { useEffect, useState } from "react"
import Board from "./Board.js"
import {DndContext, PointerSensor, useDroppable, useSensor, useSensors} from '@dnd-kit/core';

function Game() {
    const [activeGame, setActiveGame] = useState(false)
    const [fullDeck, setFullDeck] = useState([])
    const [deck, setDeck] = useState([])
    const [discardPile, setDiscardPile] = useState([])
    const [stacks, setStacks] = useState([])
    const [piles, setPiles] = useState([{suit: 0, cards: []}, {suit: 1, cards: []}, {suit: 2, cards: []}, {suit: 3, cards: []}])
    const [selectedCard, setSelectedCard] = useState([])
    const [winner, setWinner] = useState(false)

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

        for (var i = 28; i < 52; i++) {
            var card = fullDeck[i]
            card.location = 'deck'
            card.locationIndex = 0
            deck.push(card)
        }

        setStacks(stacks)
        setDeck(deck)
    }

    function drawCard() {
        for (var i = 0; i < selectedCard.length; i++) {
            selectedCard[i].selected = false
            setSelectedCard([])
        }
        if (deck.length > 0) {
            var nextCard = deck.pop()
            nextCard.visible = true
            nextCard.location = 'discard'
            discardPile.push(nextCard)
            setDeck(deck)
            setDiscardPile(discardPile)
        } else {
            for (var i = 0; i < discardPile.length; i++) {
                discardPile[i].visible = false
                discardPile[i].location = 'deck'
            }
            setDeck(discardPile.reverse())
            setDiscardPile([])
        }
    }

    function selectCard(card, stackIndex) {
        if (card.visible) {

            //if were clicking on the card weve already selected, we should unselect
            if (selectedCard.length > 0 && card.suit === selectedCard[0].suit && card.number === selectedCard[0].number) {
                for (var i = 0; i < selectedCard.length; i++) {
                    selectedCard[i].selected = false
                }
                setSelectedCard([])
            } else {

                // correctly placing a card on a stack
                if (card.location === 'stacks' && selectedCard.length > 0 && stackIndex === stacks[card.locationIndex].length - 1
                    && card.color !== selectedCard[0].color && card.number === selectedCard[0].number + 1) {

                    var source = []

                    switch(selectedCard[0].location) {
                        case 'stacks':
                            source = stacks[selectedCard[0].locationIndex]
                            break
                        case 'discard':
                            source = discardPile
                            break
                        case 'piles':
                            source = piles[selectedCard[0].locationIndex].cards
                            break
                    }

                    var destination = stacks[card.locationIndex]

                    moveCard(source, destination, card.location, card.locationIndex)

                // correctly placing a card on a foundation pile
                } else if (card.location === 'piles' && selectedCard.length === 1 && (selectedCard[0].location === 'stacks' || selectedCard[0].location === 'discard')
                        && card.suit === selectedCard[0].suit && card.number === selectedCard[0].number - 1) {

                    var source = selectedCard[0].location === 'stacks' ? stacks[selectedCard[0].locationIndex] : discardPile
                    var destination = piles[card.locationIndex].cards

                    moveCard(source, destination, card.location, card.locationIndex)

                // for all other cases, deselected whatever was already selected (if any), and select the new cards
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
            }

        } else {
            for (var i = 0; i < selectedCard.length; i++) {
                selectedCard[i].selected = false
            }
            setSelectedCard([])
        }
    }

    // function handleDoubleClick(card) {
    //     console.log('double click!', card)
    //     if (card.visible && (card.location === 'stacks' || card.location === 'discard')) {
    //         console.log(1)
    //         if (card.number === 1) {
    //             // card.selected = true
    //             setSelectedCard([card])
    //             console.log(2)
    //             var source = card.location === 'stacks' ? stacks[card.locationIndex] : discardPile
    //             var destination = piles[card.suit].cards
    //             moveCard(source, destination, 'piles', card.suit)
    //         }
    //     }
    // }

    /**
     * 
     * @param {Array} source - where the card is moving from
     * @param {Array} destination - where the card is moving to
     * @param {String} destinationString - string representation of the destination. ('piles', 'stacks', or 'discard')
     * @param {Number} destinationIndex - index of the destination array that we are moving the card to
     */
    function moveCard(source, destination, destinationString, destinationIndex) {
        for (var i = 0; i < selectedCard.length; i++) {
            source.pop()
            selectedCard[i].location = destinationString
            selectedCard[i].locationIndex = destinationIndex                    
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
        checkForWinner()
    }

    function checkForWinner() {
        if (piles.length === 4) {
            for (var i = 0; i < 4; i++) {
                if (piles[i].cards && piles[i].cards.length === 13) {
                    continue
                } else {
                    return false
                }
            }
            setWinner(true)
        }
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
        if (selectedCard && selectedCard[0].number === 13) {
            if (selectedCard[0].location === 'stacks') {
                moveCard(stacks[selectedCard[0].locationIndex], stacks[index], 'stacks', index)
            } else if (selectedCard[0].location === 'discard') {
                moveCard(discardPile, stacks[index], 'stacks', index)
            }
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
            distance: 8,
            },
        })
    )

    function handleDragOver(event) {
        const {active, over} = event

        if (over && over.data.current.accepts.includes(active.data.current.type)) {
            over.data.current.source.highlighted = true
        } 
    }

    function handleDragEnd(event) {
        const {active, over} = event

        if (over && over.data.current.accepts.includes(active.data.current.type)) {
            var cards = active.data.current.cards
            for (var i = 0; i < cards.length; i++) {
                selectedCard.push(cards[i])
            }

            var source = []

            switch(cards[0].location) {
                case 'stacks':
                    source = stacks[cards[0].locationIndex]
                    break
                case 'discard':
                    source = discardPile
                    break
                case 'piles':
                    source = piles[cards[0].locationIndex].cards
                    break
            }

            moveCard(source, over.data.current.source.cards, over.data.current.location, over.data.current.locationIndex)
        } 
    }

    return (
        <div className="game">
            {!activeGame && <button className="button" onClick={newGame}>New Game</button>}
            {activeGame && fullDeck.length > 1 && piles.length > 1 &&
                <DndContext sensors={sensors} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
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
                </DndContext>
            }
            {winner && <div>You Have Won!</div>}
        </div>
    )
}

export default Game;