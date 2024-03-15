import './css/Board.css'
import Card from './components/Card'

function Board({deck, discardPile, stacks}) {
    console.log('stacks: ', stacks)
    return (
        <div className="board">
            <div className="top-row">
                {/* <Deck cards={deck}/> */}
                <span>Piles</span>
            </div>
            <Stacks stacks={stacks}></Stacks>
        </div>
    )
}

// function Deck({cards}) {
//     return (
//         <Card 
//     )
// }

function Stacks({stacks}) {
    return (
        <div className="stacks-section">
            {stacks.map((stack, index) => 
                <Stack key={index} cards={stack}></Stack>)
            }
        </div>
    ) 
}

function Stack({cards}) {
    return (
        <div className="stack">
            {cards.map((card, index) => 
                <Card 
                    key={index} 
                    suit={card.suit} 
                    number={card.number} 
                    visible={card.visible}></Card>
            )}
        </div>
    )

}
export default Board