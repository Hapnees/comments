export type IForm = {
	[key in IFormElements]: HTMLElement
} & HTMLFormElement

// Элементы формы для отправки
type IFormElements = 'username' | 'commentText' | 'date'

// Элементы, в которых может возникнуть ошибка
type IFormErrorElements = 'username' | 'commentText'

export type IFormError = {
	[key in IFormErrorElements]: {
		isError: boolean
		element: HTMLElement | null
	}
}
