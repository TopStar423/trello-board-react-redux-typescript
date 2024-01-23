import { CardDataT } from "../../types/data"

export type AddCardPropsType = {
    listId: string
}

export type CardPropsType = {
    listId: string
    cardId: string
    cardData: CardDataT
}

export type CardDraggablePropsType = {
    editmode: number
}