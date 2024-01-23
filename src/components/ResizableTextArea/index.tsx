import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { TextAreaPropsType, TextAreaCPropsType } from "./types";

const TextArea = ({
  placeholder = "",
  editMode,
  onSave,
  updateValue,
  onBlur
}: TextAreaPropsType) => {
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setTextAreaValue(updateValue);
  }, [updateValue]);
  useEffect(() => {
    resizeTextArea();
  }, [textAreaValue]);

  useEffect(() => {
    if (editMode) {
      textAreaRef.current?.focus();
      textAreaRef.current?.select();
    }
  }, [editMode]);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    // enter pressed
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(textAreaValue);
      textAreaRef.current?.blur();
    }
  };
  return (
    <TextAreaC
      ref={textAreaRef}
      value={textAreaValue}
      onChange={onChange}
      rows={1}
      onKeyDown={onKeyDown}
      onBlur={() => onBlur(textAreaValue)}
      spellCheck="false"
      editmode={editMode ? 1 : 0}
      placeholder={placeholder}
    ></TextAreaC>
  );
};
export default TextArea;

const TextAreaC = styled.textarea<TextAreaCPropsType>`
  cursor: ${props => (props.editmode ? "text" : "pointer")};
  height: auto;
  overflow-y: hidden;
  margin: -4px 0;
  padding: 4px 8px;
  border: none;
  resize: none;
  border-radius: 3px;
  width: 100%;
  background: transparent;
  &:focus {
    background: white;
    box-shadow: inset 0 0 0 2px #0079bf;
    outline: 0;
  }
`;
