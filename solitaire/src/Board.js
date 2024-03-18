import './css/Board.css'
import Card from './components/Card'
import {useEffect, useState} from 'react'
import suits from "./config/suits"


function Board({deck, discardPile, drawCard, selectCard, piles, stacks}) {
    console.log('stacks: ', stacks)
    console.log('piles: ', piles)
    return (
        <div className="board">
            <div className="top-row">
                <Deck deck={deck} discardPile={discardPile} drawCard={drawCard}/>
                <Piles piles={piles}/>
            </div>
            <Stacks stacks={stacks} selectCard={selectCard} ></Stacks>
        </div>
    )
}

function Deck({deck, discardPile, drawCard}) {
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
        console.log('clicked!')
        console.log('1deck:', deck)
        console.log('1discard: ', discardPile)
        drawCard()
        setTopCard(deck[deck.length - 1])
        setTopDiscard(discardPile[discardPile.length - 1])
    }

    return (
        <div className="deck">
            {deck.length > 0 && 
                <div onClick={clickDeck}>
                    <Card card={topCard}></Card>
                </div>
            }
            {discardPile.length > 0 && <Card card={topDiscard}></Card>}
        </div>
    )
}

function Piles({piles}) {

    return (
        <div className="piles">
            {piles.map((pile, index) => {
                return (
                    <div className="pile" key={index}>
                        {pile.cards.length > 0
                            ? <Card/>
                            : <div className="pile-suit">{suits[pile.suit]}</div>
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
            {cards.map((card, index) => 
                <Card selectCard={selectCard} key={index} card={card}></Card>
            )}
        </div>
    )

}
export default Board