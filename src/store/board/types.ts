import type { DraggableLocation } from "react-beautiful-dnd"
import type { IBoardDataRes } from "../../services/types"
import type { BoardDataT, CardDataT, ListDataT } from "../../types/data"

interface BoardState {
    isLoading: boolean
    boardId: string
    data: BoardDataT
}

type AddCardContentPayploadT = {
    boardId: string
    list: IBoardDataRes
    data: CardDataT
}

type UpdateCardPayploadT = {
    boardId: string
    list: IBoardDataRes
    cardId: string
    data: CardDataT
}

type AddListPayloadT = {
    boardId: string
    data: ListDataT
}

type UpdateListPayloadT = {
    boardId: string
    list: IBoardDataRes
    position: number
}

type FetchBoardPayloadT = {
    boardId: string
}

type ReorderListPayloadT = {
    sourceId: string
    sourcePos: number
    destinationPos: number
}

type ReorderCardPayloadT = {
    cardId: string
    listId: string
    sourcePos: number
    destinationPos: number
}

type MoveCardPayloadT = {
    boardId: string
    cardId: string
    source: DraggableLocation
    destination: DraggableLocation
    destinationList: IBoardDataRes
    cardData: CardDataT
}

export type {
    BoardState,
    AddCardContentPayploadT,
    UpdateCardPayploadT,
    AddListPayloadT,
    UpdateListPayloadT,
    FetchBoardPayloadT,
    ReorderListPayloadT,
    MoveCardPayloadT,
    ReorderCardPayloadT,
}