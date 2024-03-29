import './css/Board.css'
import './css/Card.css'
import Card from './components/Card'
import {useEffect, useState} from 'react'
import suits from "./config/suits"
import EmptyCard from './components/EmptyCard'
import {DndContext, PointerSensor, useDroppable, useSensor, useSensors} from '@dnd-kit/core';

function Board({deck, discardPile, drawCard, selectCard, piles, stacks, startFoundation, handleEmptyStack}) {

    return (
        <div className="board">
            <div className="top-row">
                <Deck deck={deck} discardPile={discardPile} drawCard={drawCard} selectCard={selectCard}/>
                <FoundationPiles piles={piles} selectCard={selectCard} startFoundation={startFoundation}/>
            </div>
            <Stacks stacks={stacks} selectCard={selectCard} handleEmptyStack={handleEmptyStack}></Stacks>
        </div>
    )
}

function Deck({deck, discardPile, drawCard, selectCard}) {
    const [topCard, setTopCard] = useState(deck[deck.length - 1])

    useEffect(() => {

        if (deck.length > 0) {
            setTopCard(deck[deck.length - 1])
        }

    }, [deck])

    function clickDeck() {
        drawCard()
        setTopCard(deck[deck.length - 1])
    }

    return (
        <div className="deck">
            <div className="deck-pile">
                {deck.length > 0 && <Card card={deck[deck.length - 1]} selectCard={clickDeck}></Card>}
                {deck.length === 0 && <EmptyCard icon='&#8635;' handleClick={drawCard}/>}
            </div>
            <div className="deck-pile">
                {discardPile.length > 0 && <Pile cards={discardPile} selectCard={selectCard}></Pile>}
            </div>


        </div>
    )
}

function FoundationPiles({piles, selectCard, startFoundation}) {

    return (
        <div className="piles">
            {piles.map((pile, index) => <FoundationPile key={index} pile={pile} selectCard={selectCard} startFoundation={startFoundation}/>)}
        </div>
    )
}

function FoundationPile({pile, selectCard, startFoundation}) {

    const {setNodeRef, isOver} = useDroppable({
        id: 'foundation-pile-' + pile.suit,
        data: {
            source: pile,
            location: 'piles',
            locationIndex: pile.suit,
            accepts: pile.cards.length > 0 
                ? [(pile.cards[pile.cards.length - 1].number + 1) + '-' + pile.suit] 
                : ['1-' + pile.suit]
        }
    })

    useEffect(() => {
        if (!isOver) {
            pile.highlighted = false
        }

    }, [pile, isOver])

    return (
        <div className={"pile" + (pile.highlighted && isOver ? " highlighted" : "")} ref={setNodeRef}>
            {pile.cards.length > 0
                ? <Pile foundation cards={pile.cards} highlighted={pile.highlighted && isOver} selectCard={selectCard}/>
                : <EmptyCard type="pile" icon={suits[pile.suit]} handleClick={() => startFoundation(pile.suit)}/>
            }
        </div>)
}

function Pile({cards, selectCard, foundation, highlighted}) {
    return (
        <div>
            {cards && 
            <>
                {foundation && <EmptyCard hidden type="pile" icon={suits[cards[0].suit]}/>}
                {cards.length > 0 && <Card highlighted={highlighted} card={cards[cards.length - 1]} selectCard={selectCard}/>}
                {cards.length > 1 && <Card hidden card={cards[cards.length - 2]} selectCard={selectCard}/>}
            </>
            }

        </div>
    )
}

function Stacks({stacks, selectCard, handleEmptyStack}) {
    return (
        <div className="stacks-section">
            {[...Array(7)].map((element, index) => 
                <div className="stack" key={index}>
                    <EmptyCard hidden={stacks[index].length > 0} icon="" handleClick={() => handleEmptyStack(index)}/>
                    {stacks[index] && <Stack cards={stacks[index]} selectCard={selectCard} index={index}></Stack>}
                </div>
            )}
        </div>
    ) 
}

function Stack({cards, selectCard, index}) {
    const {setNodeRef, isOver} = useDroppable({
        id: 'stack-' + index,
        data: {
            source: {cards: cards},
            location: 'stacks',
            locationIndex: index,
            accepts: cards.length > 0 
                ? cards[cards.length - 1].suit % 2 === 0 
                    ? [(cards[cards.length - 1].number - 1) + '-1',  (cards[cards.length - 1].number - 1) + '-3']
                    : [(cards[cards.length - 1].number - 1) + '-0',  (cards[cards.length - 1].number - 1) + '-2']
                : []
        }
    })

    // useEffect(() => {
    //     if (!isOver) {
    //         pile.highlighted = false
    //     }

    // }, [pile, isOver])

    return (
        <div>
            {cards.map((card, cardIndex) => 
                <Card index={cardIndex} selectCard={selectCard} key={cardIndex} card={card} stacked={cardIndex !== cards.length - 1}></Card>
            )}
            {cards.length > 0 && <div ref={setNodeRef} className='invisible-card'></div>}
        </div>
    )
}

export default Board