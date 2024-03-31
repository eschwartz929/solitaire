type Card = {
    number: number,
    suit: number,
    location: Array<Card>,
    children: Array<Card>,
    flipped: boolean,
    selected: boolean,
}

export default Card