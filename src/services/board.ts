import HttpService from './base';
import { IBoardDataRes, ICardDataRes } from './types';
import { BoardDataT, CardGroupT, ListDataT } from '../types/data';

const apiService = new HttpService();

export const fetchBoardData = async (boardId: string) => {
    try {
        const res: IBoardDataRes[] = await apiService.get(`/boards/${boardId}/groups`)
        const cardRes: ICardDataRes[] = await apiService.get(`/boards/${boardId}/tasks`)
        const result: BoardDataT = {} as BoardDataT
        res.forEach((data: IBoardDataRes, idx: number) => {
            const cards: CardGroupT = {} as CardGroupT
            const cardsData = cardRes.filter(card => card.groupDto?.id === data.id)
            cardsData.forEach((cardData: ICardDataRes, cardIdx: number) => {
                cards[cardData.id] = {
                    card_title: cardData.name,
                    description: cardData.body,
                    position: cardIdx,
                }
            })
            result[data.id] = {
                list_title: data.name,
                description: data.description,
                position: idx,
                cards,
            }
        })

        return result;
    } catch (err) {
        console.log(err)
    }
}

export const addListData = async (boardId: string, data: ListDataT) => {
    try {
        const res: IBoardDataRes = await apiService.post(`/boards/${boardId}/groups`, {
            name: data.list_title,
            description: data.description,
        })
        
        return res
    } catch (err) {
        console.log(err)
    }
}

export const updateListData = async (boardId: string, list: IBoardDataRes) => {
    try {
        await apiService.update(`/boards/${boardId}/groups`, list)
    } catch (err) {
        console.log(err)
    }
}