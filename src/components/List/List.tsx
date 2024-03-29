import React, { useState } from "react";
import { Card, AddCard } from "../Card";
import ListTitle from "./ListTitle";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ListPropsType } from "./types";
import { sortDataFn } from "../../utils/dataHelper";

const List = ({ listId, listData }: ListPropsType) => {
  const cardIds = Object.keys(listData.cards).sort(sortDataFn(listData.cards));

  const [dragBlocking, setDragBlocking] = useState(false);

  return (
    <Draggable
      disableInteractiveElementBlocking={!dragBlocking}
      draggableId={listId}
      index={listData.position}
    >
      {provided => (
        <ListWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <ListContent>
            <ListTitle
              dragHandleProps={provided.dragHandleProps}
              listId={listId}
              listData={listData}
              setDragBlocking={setDragBlocking}
            ></ListTitle>

            <Droppable droppableId={listId}>
              {(droppableProvided, droppableSnapshot) => (
                <ListDroppable ref={droppableProvided.innerRef}>
                  {cardIds.map(id => {
                    return (
                      <Card
                        key={id}
                        cardId={id}
                        listId={listId}
                        cardData={listData.cards[id]}
                      ></Card>
                    );
                  })}
                  {droppableProvided.placeholder}
                </ListDroppable>
              )}
            </Droppable>
            <AddCard listId={listId}></AddCard>
          </ListContent>
        </ListWrapper>
      )}
    </Draggable>
  );
};
export default List;

const ListWrapper = styled.div`
  &:first-child {
    margin-left: 8px;
  }
  width: 272px;
  display: inline-block;
  flex: 0 0 272px;
  margin: 0 4px;
`;
const ListContent = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
`;

const ListDroppable = styled.div`
  min-height: 50px;
  margin: 0 4px;
  padding: 0 4px;
`;
