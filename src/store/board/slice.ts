import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { 
  AddCardContentPayploadT,
  UpdateCardPayploadT,
  AddListPayloadT,
  UpdateListPayloadT,
  ReorderListPayloadT,
  ReorderCardPayloadT,
  BoardState,
  MoveCardPayloadT,
} from './types'
import { fetchBoardData, addListData, updateListData } from '../../services/board'
import { addCardData, updateCardData, deleteCardData } from '../../services/card'

// initial state using that type
const initialState: BoardState = {
  isLoading: false,
  boardId: process.env.REACT_APP_BOARD_ID as string,
  data: {},
}

export const fetchBoardContent = createAsyncThunk(
  'board/fetch',
  async (boardId: string) => {
    const data = await fetchBoardData(boardId)
    return data
  }
)

export const addCard = createAsyncThunk(
  'card/add',
  async ({ boardId, list, data }: AddCardContentPayploadT) => {
    const newCard = await addCardData(boardId, list, data)
    return {
      listId: list.id,
      cardId: newCard?.id,
      data,
    }
  }
)

export const updateCard = createAsyncThunk(
  'card/update',
  async ({ boardId, list, cardId, data }: UpdateCardPayploadT) => {
    await updateCardData(boardId, list, cardId, data)
    return {
      listId: list.id,
      cardId,
      data,
    }
  }
)

export const deleteCard = createAsyncThunk(
  'card/delete',
  async ({ boardId, list, cardId, data }: UpdateCardPayploadT) => {
    await deleteCardData(boardId, list, cardId, data)
    return {
      listId: list.id,
      cardId,
    }
  }
)

export const addList = createAsyncThunk(
  'list/addList',
  async ({ boardId, data }: AddListPayloadT) => {
    const newList = await addListData(boardId, data)
    return {
      newList,
      position: data.position
    }
  }
)

export const updateList = createAsyncThunk(
  'list/updateTitle',
  async ({ boardId, list, position }: UpdateListPayloadT) => {
    await updateListData(boardId, list)
    return {
      list,
      position,
    }
  }
)

export const moveCard = createAsyncThunk(
  'board/moveCard',
  async ({ boardId, cardId, source, destination, destinationList, cardData }: MoveCardPayloadT) => {
    await updateCardData(boardId, destinationList, cardId, cardData)
    return {
      cardId,
      source,
      destination,
      cardData,
    }
  }
)

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reorderList(state, action: PayloadAction<ReorderListPayloadT>) {
      const { sourceId, sourcePos, destinationPos } = action.payload
      const boardData = state.data
      
      Object.keys(boardData).forEach(listId => {
        if (sourcePos < destinationPos) {
          if (boardData[listId].position > sourcePos && boardData[listId].position <= destinationPos) {
            boardData[listId].position--
          }
        } else {
          if (boardData[listId].position < sourcePos && boardData[listId].position >= destinationPos) {
            boardData[listId].position++
          }
        }
      })
      boardData[sourceId].position = destinationPos

      state.data = boardData
    },
    reorderCard(state, action: PayloadAction<ReorderCardPayloadT>) {
      const { cardId: sourceCardId, listId, sourcePos, destinationPos } = action.payload
      const boardData = state.data
      Object.keys(boardData[listId].cards).forEach(cardId => {
        if (sourcePos < destinationPos) {
          if (boardData[listId].cards[cardId].position > sourcePos && boardData[listId].cards[cardId].position <= destinationPos) {
            boardData[listId].cards[cardId].position--
          }
        } else {
          if (boardData[listId].cards[cardId].position < sourcePos && boardData[listId].cards[cardId].position >= destinationPos) {
            boardData[listId].cards[cardId].position++
          }
        }
      })

      boardData[listId].cards[sourceCardId].position = destinationPos

      state.data = boardData
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBoardContent.fulfilled, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        state.data = action.payload
      }
    })
    builder.addCase(fetchBoardContent.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(addCard.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addCard.fulfilled, (state, action) => {
      state.isLoading = false
      const { listId, cardId, data } = action.payload
      const boardData = state.data;
      if (cardId) {
        boardData[listId].cards[cardId] = data
      }

      state.data = boardData
    })
    builder.addCase(addCard.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(updateCard.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateCard.fulfilled, (state, action) => {
      state.isLoading = false
      const { listId, cardId, data } = action.payload
      const boardData = state.data;
      if (boardData[listId].cards) {
        boardData[listId].cards[cardId] = data
      } else {
        Object.keys(boardData).forEach(boardListId => {
          if (boardData[boardListId].cards[cardId]) {
            delete boardData[boardListId].cards[cardId]
            return false
          }
        })
        boardData[listId].cards[cardId] = data
      }

      state.data = boardData
    })
    builder.addCase(updateCard.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(addList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addList.fulfilled, (state, action) => {
      state.isLoading = false
      const { newList, position } = action.payload
      const boardData = state.data;
      if (newList) {
        boardData[newList.id] = {
          list_title: newList.name,
          description: newList.description,
          position,
          cards: {},
        }
      }


      state.data = boardData
    })
    builder.addCase(addList.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(updateList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateList.fulfilled, (state, action) => {
      state.isLoading = false
      const { list, position } = action.payload
      const boardData = state.data;
      boardData[list.id] = {
        list_title: list.name,
        description: list.description,
        position,
        cards: boardData[list.id].cards,
      }


      state.data = boardData
    })
    builder.addCase(updateList.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(moveCard.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(moveCard.fulfilled, (state, action) => {
      state.isLoading = false
      const { cardId, source, destination, cardData } = action.payload
      const boardData = state.data
      
      const sourceListId = source.droppableId
      delete boardData[sourceListId].cards[cardId]

      Object.keys(boardData[sourceListId].cards).forEach(cardId => {
        if (boardData[sourceListId].cards[cardId].position > cardData.position) {
          boardData[sourceListId].cards[cardId].position--
        }
      })

      const destinationId = destination.droppableId
      Object.keys(boardData[destinationId].cards).forEach(cardId => {
        if (boardData[destinationId].cards[cardId].position >= destination.index) {
          boardData[destinationId].cards[cardId].position++
        }
      })

      boardData[destinationId].cards[cardId] = {
        ...cardData,
        position: destination.index,
      }

      state.data = boardData
    })
    builder.addCase(moveCard.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})

export const { reorderList, reorderCard } = boardSlice.actions

export default boardSlice.reducer