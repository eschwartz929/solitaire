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
                {discardPile.length > 0 && <Card card={discardPile[discardPile.length - 1]} selectCard={selectCard}></Card>}
            </div>


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
            {[...Array(7)].map((element, index) => 
                <div className="stack" key={index}>
                    {stacks[index] && stacks[index].length > 0 && <Stack cards={stacks[index]} selectCard={selectCard}></Stack>}
                    {stacks[index] && stacks[index].length === 0 && <EmptyCard icon="" handleClick={() => handleEmptyStack(index)}/>}
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