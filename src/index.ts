import './styles/index.scss'
import { IForm } from './types/form.type'
import { onBlur, onInput, onSubmit } from './utils/form.events'
import { isUsernameValid } from './utils/form.validators'

const initialForm = () => {
	// Если не нашли форму
	if (!('comment' in document.forms)) throw new Error('Форма не найдена')

	// Получаем элементы
	const title = document.querySelector('.title') as Element
	const form = document.forms['comment'] as IForm
	const nameInput = form.username as HTMLInputElement
	const commentInput = form.commentText as HTMLTextAreaElement
	const commentList = document.getElementById('commentList')

	if (!commentList?.children.length)
		title.textContent = 'Комментарии отсутствуют'

	// Вешаем обработчики
	nameInput.onblur = () =>
		onBlur(
			nameInput,
			'username',
			'Некорректное имя',
			isUsernameValid(nameInput.value)
		)
	nameInput.oninput = () =>
		onInput(nameInput, 'username', isUsernameValid(nameInput.value))
	commentInput.onblur = () =>
		onBlur(commentInput, 'commentText', 'Введите комментарий')
	commentInput.oninput = () => onInput(commentInput, 'commentText')

	window.onkeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && !event.shiftKey)
			onSubmit(form, commentList, title)
	}

	// Вешаем обработчик для публикации комментария
	form.onsubmit = event => onSubmit(form, commentList, title, event)
}

initialForm()
