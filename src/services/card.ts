import HttpService from './base';
import { IBoardDataRes, ICardDataRes } from './types';
import { CardDataT } from '../types/data';

const apiService = new HttpService();

export const addCardData = async (boardId: string, list: IBoardDataRes, cardData: CardDataT) => {
    try {
        const res: ICardDataRes = await apiService.post(`/boards/${boardId}/tasks`, {
            name: cardData.card_title,
            body: cardData.description,
            groupDto: list,
        })

        return res
    } catch (err) {
        console.log(err)
    }
}

export const updateCardData = async (boardId: string, list: IBoardDataRes, cardId: string, cardData: CardDataT) => {
    try {
        await apiService.update(`/boards/${boardId}/tasks`, {
            id: cardId,
            name: cardData.card_title,
            body: cardData.description,
            groupDto: list,
        })
    } catch (err) {
        console.log(err)
    }
}

export const deleteCardData = async (boardId: string, list: IBoardDataRes, cardId: string, cardData: CardDataT) => {
    try {
        await apiService.remove(`/boards/${boardId}/tasks?id=${cardId}`)
    } catch (err) {
        console.log(err)
    }
}