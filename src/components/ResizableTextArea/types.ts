export type TextAreaPropsType = {
    placeholder?: string
    editMode: boolean
    updateValue: string
    onSave: (content: any) => void
    onBlur: (content: any) => void
}

export type TextAreaCPropsType = {
    editmode: number
}