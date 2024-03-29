import './css/Board.css'
import './css/Card.css'
import Card from './components/Card'
import {useEffect, useState} from 'react'
import suits from "./config/suits"
import EmptyCard from './components/EmptyCard'
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';

function Board({deck, discardPile, drawCard, selectCard, piles, stacks, startFoundation, handleEmptyStack}) {

    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 8,
          },
        })
      )

    return (
        <DndContext sensors={sensors}>
            <div className="board">
                <div className="top-row">
                    <Deck deck={deck} discardPile={discardPile} drawCard={drawCard} selectCard={selectCard}/>
                    <FoundationPiles piles={piles} selectCard={selectCard} startFoundation={startFoundation}/>
                </div>
                <Stacks stacks={stacks} selectCard={selectCard} handleEmptyStack={handleEmptyStack}></Stacks>
            </div>
        </DndContext>
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
            {piles.map((pile, index) => {
                return (
                    <div className="pile" key={index}>
                        {pile.cards.length > 0
                            ? <Pile foundation cards={pile.cards} selectCard={selectCard}/>
                            : <EmptyCard type="pile" icon={suits[pile.suit]} handleClick={() => startFoundation(pile.suit)}/>
                        }
                    </div>)
            }
            )}
        </div>
    )
}

function Pile({cards, selectCard, foundation}) {
    return (
        <div>
            {cards && 
            <>
                {cards.length > 0 && <Card card={cards[cards.length - 1]} selectCard={selectCard}/>}
                {cards.length > 1 && <Card hidden card={cards[cards.length - 2]} selectCard={selectCard}/>}
                {cards.length === 1 && foundation && <EmptyCard hidden type="pile" icon={suits[cards[0].suit]}/>}
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
                    {stacks[index] && stacks[index].length > 0 
                        ? <Stack cards={stacks[index]} selectCard={selectCard}></Stack>
                        : <EmptyCard icon="" handleClick={() => handleEmptyStack(index)}/>
                    }
                </div>
            )}
        </div>
    ) 
}

function Stack({cards, selectCard}) {
    return (
        <div>
            {cards.map((card, index) => 
                <Card index={index} selectCard={selectCard} key={index} card={card} stacked={index !== cards.length - 1}></Card>
            )}
        </div>
    )
}

export default Board