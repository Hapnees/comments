import { likeIcon, trashIcon } from '../icons/comment.icons'
import { IForm } from '../types/form.type'
import dateFormatter from './date.format'

export const createComment = (
	form: IForm,
	commentList: HTMLElement | null,
	title: Element
) => {
	if (!commentList) throw new Error('Список комментариев отсутствует')

	const usernameElem = form.username as HTMLInputElement
	const textCommentElem = form.commentText as HTMLTextAreaElement
	const dateElem = form.date as HTMLInputElement

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
}
