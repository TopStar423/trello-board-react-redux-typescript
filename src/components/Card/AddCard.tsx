import React, { useState } from "react";
import styled from "styled-components";
import TextArea from "../ResizableTextArea";
import { AddCardPropsType } from "./types";
import { CardDataT } from "../../types/data";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addCard } from "../../store/board/slice";

const AddCard = ({ listId }: AddCardPropsType) => {
  const [compose, setCompose] = useState<boolean>(false);
  
  const { data: boardData, boardId } = useAppSelector(state => state.board)
  const dispatch = useAppDispatch();

  if (!compose) {
    return (
      <Link onClick={() => setCompose(true)}>
        <span className="trellicons">&#xE901;</span>{" "}
        <span>Add another card</span>
      </Link>
    );
  }

  const onSave = (title: string) => {
    const cardData: CardDataT = {
      card_title: title,
      description: "",
      position: Object.keys(boardData[listId]).length
    }
    const listData = boardData[listId]
    const list = {
      id: listId,
      name: listData.list_title,
      description: listData.description,
    }
    dispatch(addCard({ boardId, list, data: cardData }));
    setCompose(false);
  };

  const cancel = () => {
    setCompose(false);
  };

  return (
    <Wrapper>
      <TextArea
        onSave={onSave}
        updateValue=""
        onBlur={cancel}
        editMode={true}
        placeholder="Enter a title for this card…"
      ></TextArea>
    </Wrapper>
  );
};
export default AddCard;

const Link = styled.div`
  cursor: pointer;
  padding: 8px;
  &:hover span:last-child {
    text-decoration: underline;
  }
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

const Wrapper = styled.div`
  padding: 8px;
`;
