import { useEffect } from "react";
import { List, AddList } from "../List";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { sortDataFn } from "../../utils/dataHelper";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchBoardContent, reorderList, reorderCard, moveCard } from "../../store/board/slice";

const Board = () => {
  const { data: boardData, boardId } = useAppSelector(state => state.board);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchBoardContent(boardId))
  }, [dispatch, boardId]);

  if (!boardData) {
    return <div>loading</div>;
  }

  const onBeforeDragStart = () => {
    if (document.activeElement?.tagName.toUpperCase() === "TEXTAREA") {
      (document.activeElement as HTMLElement).blur();
    }
  };

  const onDragEnd = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }
  
    const source = result.source;
    const destination = result.destination;
    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    if (result.type === "COLUMN") {
      dispatch(reorderList({ 
        sourceId: result.draggableId,
        sourcePos: source.index, 
        destinationPos: destination.index,
      }));
      return;
    }

    if (source.droppableId === destination.droppableId) {
      dispatch(reorderCard({ 
        cardId: result.draggableId,
        listId: source.droppableId,
        sourcePos: source.index, 
        destinationPos: destination.index,
      }));

      return;
    }

    const listData = boardData[source.droppableId]
    const destinationList = {
      id: destination.droppableId,
      name: listData.list_title,
      description: listData.description,
    }

    const cardData = listData.cards[result.draggableId]

    dispatch(moveCard({
      boardId,
      cardId: result.draggableId,
      source: source, 
      destination: destination,
      destinationList,
      cardData,
    }))
  };

  const listIds = Object.keys(boardData).sort(sortDataFn(boardData));

  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {provided => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {listIds.map(id => {
              return (
                <List key={id} listId={id} listData={boardData[id]}></List>
              );
            })}
            {provided.placeholder}
            <AddList />
          </BoardContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Board;

const BoardContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  height: 100%;
  display: flex;
`;
