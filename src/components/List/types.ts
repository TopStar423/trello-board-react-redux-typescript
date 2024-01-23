import { ListDataT } from "../../types/data"

export type ListPropsType = {
    listId: string
    listData: ListDataT
}

export type AddListWrapperProps = {
    compose: number
}

export interface ListTitlePropsType extends ListPropsType {
    setDragBlocking: (isBlocked: boolean) => void,
    dragHandleProps: any
}