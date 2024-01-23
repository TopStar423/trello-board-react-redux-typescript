export type CardDataT = {
    card_title: string
    description: string
    position: number
}

export type CardGroupT = {
    [cardId: string]: CardDataT
}

export type ListDataT = {
    list_title: string
    description: string
    position: number
    cards: CardGroupT
}

export type BoardDataT = {
    [listId: string]: ListDataT
}