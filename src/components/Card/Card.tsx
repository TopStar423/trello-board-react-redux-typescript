import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import TextArea from "../ResizableTextArea";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateCard, deleteCard } from "../../store/board/slice";
import { CardPropsType, CardDraggablePropsType } from "./types";

const Card = ({ listId, cardId, cardData }: CardPropsType) => {
  const [editTitleMode, setEditTitleMode] = useState<boolean>(false);
  const [editDescriptionMode, setEditDescriptionMode] = useState(false);

  const dispatch = useAppDispatch();
  const { data: boardData, boardId } = useAppSelector(state => state.board)

  const onSaveTitle = (title: string) => {
    const listData = boardData[listId]
    const list = {
      id: listId,
      name: listData.list_title,
      description: listData.description,
    }

    dispatch(updateCard({ 
      boardId,
      list, 
      cardId,
      data: {
        card_title: title,
        description: cardData.description,
        position: cardData.position,
      }
    }))
    setEditTitleMode(false);
  };

  const titleClick = () => {
    setEditTitleMode(true);
  };

  const deleteClick = () => {
    const listData = boardData[listId]
    const list = {
      id: listId,
      name: listData.list_title,
      description: listData.description,
    }

    dispatch(deleteCard({ 
      boardId,
      list, 
      cardId,
      data: cardData,
    }))
  };

  const onSaveDescription = (description: string) => {
    const listData = boardData[listId]
    const list = {
      id: listId,
      name: listData.list_title,
      description: listData.description,
    }

    dispatch(updateCard({
      boardId,
      list, 
      cardId,
      data: {
        card_title: cardData.card_title,
        description,
        position: cardData.position,
      }
    }))
    setEditDescriptionMode(false);
  };

  const descriptionClick = () => {
    setEditDescriptionMode(true);
  };

  return (
    <Draggable
      draggableId={cardId}
      index={cardData.position}
      disableInteractiveElementBlocking={!editTitleMode && !editDescriptionMode}
    >
      {(draggableProvided, draggableSnapshot) => (
        <CardDraggable
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          editmode={(editTitleMode || editDescriptionMode) ? 1 : 0}
        >
          <TextAreaWrapper onClick={titleClick}>
            <TextArea
              onSave={onSaveTitle}
              updateValue={cardData.card_title}
              onBlur={onSaveTitle}
              editMode={editTitleMode}
            ></TextArea>
          </TextAreaWrapper>

          <TextAreaWrapper onClick={descriptionClick}>
            <TextArea
              placeholder="Description here..."
              onSave={onSaveDescription}
              updateValue={cardData.description}
              onBlur={onSaveDescription}
              editMode={editDescriptionMode}
            ></TextArea>
          </TextAreaWrapper>

          <Delete onClick={deleteClick}>&#xE918;</Delete>
        </CardDraggable>
      )}
    </Draggable>
  );
};
export default Card;

const Delete = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-family: trellicons;
  border-radius: 3px;
  height: 23px;
  width: 23px;
  line-height: 23px;
  text-align: center;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  visibility: hidden;
  cursor: pointer;
`;

const TextAreaWrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 2px;
  /* padding-right: 36px; */
`;

const CardDraggable = styled.div<CardDraggablePropsType>`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: ${props =>
    props.editmode ? "none" : "0 2px 4px rgba(2, 2, 2, 0.6)"};
  margin-bottom: 8px;
  position: relative;
  &:hover ${Delete} {
    visibility: visible;
  }
`;
