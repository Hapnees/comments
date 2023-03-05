import { IForm, IFormError } from '../types/form.type'
import { createComment } from './createComment'

// Список возможных ошибок
const errorList: IFormError = {
	username: {
		isError: false,
		element: null,
	},
	commentText: {
		isError: false,
		element: null,
	},
}

export const onInput = (
	inputElem: HTMLInputElement | HTMLTextAreaElement,
	keyErrorList: keyof typeof errorList,
	condition = true
) => {
	if (inputElem.value && errorList[keyErrorList].isError && condition) {
		errorList[keyErrorList].isError = false
		errorList[keyErrorList].element?.remove()
	}
}

export const onBlur = (
	inputElem: HTMLInputElement | HTMLTextAreaElement,
	keyErrorList: keyof typeof errorList,
	text: string,
	condition = true
) => {
	if (!inputElem.value || !condition) {
		const error = document.createElement('p')

		// Ищем родителя поля для ввода, в классе которого есть слово wrapper или container
		// На случай если захотим добавить ещё поле в форму, в которой не нужен wrapper

		const container: HTMLElement | null =
			inputElem.closest(`[class*="wrapper"]`) ||
			inputElem.closest(`[class*="container"]`)

		error.className = 'form__error'
		error.textContent = text

		if (container) error.style.left = container.offsetWidth + 10 + 'px'

		// Показываем ошибку
		if (!errorList[keyErrorList].isError) {
			errorList[keyErrorList].element = error
			container?.append(error)
			errorList[keyErrorList].isError = true
		}

		// На случай, если захотим что-то поменять в конкретной ошибке
		return error
	}
}

export const onSubmit = (
	form: IForm,
	commentList: HTMLElement | null,
	title: Element,
	event?: SubmitEvent
) => {
	event?.preventDefault()
	const usernameElem = form.username as HTMLInputElement
	const textCommentElem = form.commentText as HTMLTextAreaElement
	const dateElem = form.date as HTMLInputElement

	if (
		Object.values(errorList).filter(error => error.isError).length ||
		!usernameElem.value ||
		!textCommentElem.value
	) {
		alert('Заполните поля!')
		return
	}

	createComment(form, commentList, title)

	usernameElem.value = ''
	textCommentElem.value = ''
	dateElem.value = ''

	title.textContent = 'Комментарии'
}
