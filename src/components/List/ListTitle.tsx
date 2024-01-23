import { useState } from "react";
import styled from "styled-components";
import TextArea from "../ResizableTextArea";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ListTitlePropsType } from "./types";
import { updateList } from "../../store/board/slice";

const ListTitle = ({ setDragBlocking, dragHandleProps, listId, listData }: ListTitlePropsType) => {
  const [editTitleMode, setEditTitleMode] = useState(false);
  const [updateTitleValue, setUpdateTitleValue] = useState(listData.list_title);

  const [editDescriptionMode, setEditDescriptionMode] = useState(false);

  const { data: boardData, boardId } = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();

  const onSaveTitle = (title: string) => {
    if (title.trim() === "") {
      // this is hack, prevent user accidently deleting title
      setUpdateTitleValue("");
      setTimeout(() => setUpdateTitleValue(listData.list_title), 0);
    } else {
      const listData = boardData[listId]
      const list = {
        id: listId,
        name: title,
        description: listData.description,
      }
      dispatch(updateList({ 
        boardId,
        list,
        position: listData.position
      }))
    }

    setDragBlocking(false);
    setEditTitleMode(false);
  };

  const onTitleClick = () => {
    setDragBlocking(true);
    setEditTitleMode(true);
  };

  const deleteClick = () => {
    // deleteList(listId);
  };

  const onSaveDescription = (desc: string) => {
    const listData = boardData[listId]
    const list = {
      id: listId,
      name: listData.list_title,
      description: desc,
    }
    dispatch(updateList({ 
      boardId,
      list,
      position: listData.position
    }))

    setDragBlocking(false);
    setEditDescriptionMode(false);
  };

  const onDescriptionClick = () => {
    setDragBlocking(true);
    setEditDescriptionMode(true);
  };

  return (
    <Container {...dragHandleProps}>
      <TitleWrapper onClick={onTitleClick}>
        <TextArea
          onSave={onSaveTitle}
          updateValue={updateTitleValue}
          onBlur={onSaveTitle}
          editMode={editTitleMode}
        ></TextArea>
      </TitleWrapper>
      <DescriptionWrapper onClick={onDescriptionClick}>
        <TextArea
          placeholder="Description here..."
          onSave={onSaveDescription}
          updateValue={listData.description}
          onBlur={onSaveDescription}
          editMode={editDescriptionMode}
        ></TextArea>
      </DescriptionWrapper>

      <Delete onClick={deleteClick}>&#xE918;</Delete>
    </Container>
  );
};
export default ListTitle;

const Delete = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-family: trellicons;
  border-radius: 3px;
  height: 32px;
  width: 32px;
  line-height: 32px;
  text-align: center;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  visibility: hidden;
`;

const Container = styled.div`
  position: relative;
  && {
    cursor: pointer;
  }
  &:hover ${Delete} {
    visibility: visible;
  }
`;

const TitleWrapper = styled.div`
  padding: 10px 8px 0;
  padding-right: 36px;

  & textarea {
    font-weight: 600;
  }
`;

const DescriptionWrapper = styled.div`
  padding: 2px 12px;
  padding-right: 36px;

  & textarea {
    font-weight: 500;
  }
`;
