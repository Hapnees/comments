import { likeIcon, trashIcon } from '../icons/comment.icons'
import { IForm, IFormError } from '../types/form.type'
import dateFormatter from './date.format'

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

	return inputElem
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

	if (!commentList) throw new Error('Список комментариев отсутствует')

	// Формируем комментарий
	const commentContainer = document.createElement('article')
	const commentTopContent = document.createElement('div')
	const commentUsername = document.createElement('p')
	const commentDate = document.createElement('p')
	const commentText = document.createElement('p')
	const commentBottomContent = document.createElement('div')
	const commentBottomContentIcons = document.createElement('div')

	commentContainer.className = 'comment__container'
	commentTopContent.className = 'comment__top-content'
	commentUsername.className = 'comment__top-content__title'
	commentDate.className = 'comment__top-content__date'
	commentText.className = 'comment__top-content__text'
	commentBottomContentIcons.className = 'comment__bottom-content__icons'
	commentBottomContent.className = 'comment__bottom-content'

	commentUsername.textContent = usernameElem.value
	commentDate.textContent = dateFormatter(
		dateElem.value || new Date().toString()
	)
	commentText.textContent = textCommentElem.value

	commentTopContent.append(commentUsername, commentDate)
	commentBottomContentIcons.innerHTML = trashIcon + likeIcon
	commentBottomContent.append(commentBottomContentIcons)
	commentContainer.append(commentTopContent, commentText, commentBottomContent)

	commentList.prepend(commentContainer)

	const trashIconElem = document.getElementById('trash-icon') as HTMLElement
	trashIconElem.onclick = () => {
		commentContainer.remove()
		const commentList = document.getElementById('commentList')
		if (!commentList?.children.length)
			title.textContent = 'Комментарии отсутствуют'
	}

	const likeIconElem = document.getElementById('like_icon') as HTMLElement
	likeIconElem.onclick = () => likeIconElem.classList.toggle('liked')

	usernameElem.value = ''
	textCommentElem.value = ''
	dateElem.value = ''

	title.textContent = 'Комментарии'
}
