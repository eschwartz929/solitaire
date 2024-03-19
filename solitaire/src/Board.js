import './css/Board.css'
import Card from './components/Card'
import {useEffect, useState} from 'react'
import suits from "./config/suits"
import EmptyCard from './components/EmptyCard'


function Board({deck, discardPile, drawCard, selectCard, piles, stacks, startFoundation, handleEmptyStack}) {
    return (
        <div className="board">
            <div className="top-row">
                <Deck deck={deck} discardPile={discardPile} drawCard={drawCard} selectCard={selectCard}/>
                <Piles piles={piles} selectCard={selectCard} startFoundation={startFoundation}/>
            </div>
            <Stacks stacks={stacks} selectCard={selectCard} handleEmptyStack={handleEmptyStack}></Stacks>
        </div>
    )
}

function Deck({deck, discardPile, drawCard, selectCard}) {
    const [topCard, setTopCard] = useState(deck[deck.length - 1])
    const [topDiscard, setTopDiscard] = useState(discardPile[discardPile.length - 1])

    useEffect(() => {
        if (deck.length > 0) {
            setTopCard(deck[deck.length - 1])
        }

        if (discardPile.length > 0) {
            setTopDiscard(discardPile[discardPile.length - 1])
        }

    }, [deck, discardPile])

    function clickDeck() {
        drawCard()
        setTopCard(deck[deck.length - 1])
        setTopDiscard(discardPile[discardPile.length - 1])
    }

    return (
        <div className="deck">
            {deck.length > 0 && <Card card={topCard} selectCard={clickDeck}></Card>}
            {deck.length === 0 && <EmptyCard icon='&#8635;' handleClick={drawCard}/>}
            {discardPile.length > 0 && <Card card={topDiscard} selectCard={selectCard}></Card>}
            {discardPile.length === 0 && <EmptyCard icon=''/>}
        </div>
    )
}

function Piles({piles, selectCard, startFoundation}) {

    return (
        <div className="piles">
            {piles.map((pile, index) => {
                return (
                    <div className="pile" key={index}>
                        {pile.cards.length > 0
                            ? <Card className="pile" card={pile.cards[pile.cards.length - 1]} selectCard={selectCard}/>
                            : <EmptyCard icon={suits[pile.suit]} handleClick={() => startFoundation(pile.suit)}/>
                                                    }
                    </div>)
            }
            )}
        </div>
    )
}

function Stacks({stacks, selectCard, handleEmptyStack}) {
    return (
        <div className="stacks-section">
            {stacks.map((stack, index) => 
                <div className="stack" key={index}>
                    {stack.length > 0 && <Stack cards={stack} selectCard={selectCard}></Stack>}
                    {stack.length === 0 && <EmptyCard icon="" handleClick={() => handleEmptyStack(index)}/>}
                </div>
            )}
        </div>
    ) 
}

function Stack({cards, selectCard}) {
    return (
        <div className="stack">
            {cards.map((card, index) => 
                <Card index={index} selectCard={selectCard} key={index} card={card} stacked={index !== cards.length - 1}></Card>
            )}
        </div>
    )

}

export default Board