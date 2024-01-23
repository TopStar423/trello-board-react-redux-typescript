import { 
  useState, 
  useRef, 
  useEffect, 
  ChangeEvent, 
  KeyboardEvent,
} from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { addList } from "../../store/board/slice"
import { AddListWrapperProps } from "./types"
import { CardGroupT } from "../../types/data"

const AddList = () => {
  const [compose, setCompose] = useState<boolean>(false)
  const [listTitle, setListTitle] = useState("")

  const { data: boardData, boardId } = useAppSelector(state => state.board)
  const dispatch = useAppDispatch()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListTitle(e.target.value)
  }
  const refInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (compose) {
      refInput.current?.focus()
    }
  }, [compose])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      // e.preventDefault()
      dispatch(addList({
        boardId,
        data: {
          list_title: listTitle,
          description: "",
          position: Object.keys(boardData).length,
          cards: {} as CardGroupT
        },
      }))
      setListTitle("")
      setCompose(false)
    }
  }

  const onBlur = () => {
    if (listTitle.length > 0) {
      dispatch(addList({
        boardId,
        data: {
          list_title: listTitle,
          description: "",
          position: Object.keys(boardData).length,
          cards: {} as CardGroupT
        },
      }))
      setListTitle("")
    }
    setCompose(false)
  }

  return (
    <Container>
      <Wrapper compose={compose ? 1 : 0}>
        <Button onClick={() => setCompose(true)}>
          <span className="trellicons">&#xE901</span>{" "}
          <span>Add another list</span>
        </Button>
        {compose && (
          <Input
            ref={refInput}
            type="text"
            value={listTitle}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            placeholder="Enter list title..."
          />
        )}
      </Wrapper>
    </Container>
  )
}
export default AddList

const Container = styled.div`
  width: 272px;
  flex: 0 0 272px;
  /* instead of margin right for overflow-x scroll */
  border-right: 8px solid transparent;
  margin-left: 4px;
`

const Wrapper = styled.div<AddListWrapperProps>`
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.compose ? "#ebecf0" : "hsla(0, 0%, 100%, 0.24)"};
  color: #fff;
  &:hover {
    background-color: ${props =>
      props.compose ? "#ebecf0" : "hsla(0, 0%, 100%, 0.32)"};
  }
`

const Button = styled.div`
  cursor: pointer;
`

const Input = styled.input`
  border-radius: 3px;
  margin: -4px 0;
  padding: 4px 8px;
  border: none;
  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
    outline: 0;
  }
`
