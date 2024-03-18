import './css/Board.css'
import Card from './components/Card'
import {useEffect, useState} from 'react'
import suits from "./config/suits"


function Board({deck, discardPile, drawCard, selectCard, piles, stacks, startFoundation}) {
    return (
        <div className="board">
            <div className="top-row">
                <Deck deck={deck} discardPile={discardPile} drawCard={drawCard} selectCard={selectCard}/>
                <Piles piles={piles} selectCard={selectCard} startFoundation={startFoundation}/>
            </div>
            <Stacks stacks={stacks} selectCard={selectCard} ></Stacks>
        </div>
    )
}

function Deck({deck, discardPile, drawCard, selectCard}) {
    const [topCard, setTopCard] = useState(deck[deck.length - 1])
    const [topDiscard, setTopDiscard] = useState(discardPile[discardPile.length - 1])

    useEffect(() => {
        if (deck.length > 1) {
            setTopCard(deck[deck.length - 1])
        }

        if (discardPile.length > 1) {
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
            {deck.length > 0 && 
                <Card card={topCard} selectCard={clickDeck}></Card>
            }
            {discardPile.length > 0 && <Card card={discardPile[discardPile.length - 1]} selectCard={selectCard}></Card>}
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
                            ? <Card card={pile.cards[pile.cards.length - 1]} selectCard={selectCard}/>
                            : <div className={"pile-suit" + ((index % 2 === 1) ? " red-card": "")} onClick={() => startFoundation(pile.suit)}>{suits[pile.suit]}</div>
                        }
                    </div>)
            }
            )}
        </div>
    )
}

function Stacks({stacks, selectCard}) {
    return (
        <div className="stacks-section">
            {stacks.map((stack, index) => 
                <Stack className="stack" key={index} cards={stack} selectCard={selectCard}></Stack>)
            }
        </div>
    ) 
}

function Stack({cards, selectCard}) {
    return (
        <div className="stack">
            {cards && cards.map((card, index) => 
                <Card selectCard={selectCard} key={index} card={card} stacked={index !== cards.length - 1}></Card>
            )}
        </div>
    )

}
export default Board