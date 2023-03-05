const dateFormatter = (date: string) => {
	const correctDate = new Date(date)
	const currentDate = new Date()
	const diff = currentDate.valueOf() - correctDate.valueOf()

	if (diff < 1000) {
		return 'Только что'
	}
	const sec = Math.floor(diff / 1000)
	if (sec < 60) {
		return `${sec} секунд назад`
	}
	const min = Math.floor(sec / 60)
	if (min < 60) {
		return `${min} минут назад`
	}
	const hour = Math.floor(min / 60)
	if (hour < 24) {
		return `${hour} часов назад`
	}

	const day = Math.floor(hour / 24)

	const tmpDate = [
		'0' + correctDate.getDate(),
		'0' + (correctDate.getMonth() + 1),
		correctDate.getFullYear(),
		'0' + correctDate.getHours(),
		'0' + correctDate.getMinutes(),
	].map(el => el.toString().slice(-2))

	const result =
		tmpDate.slice(0, 3).join('.') + ' ' + tmpDate.slice(3).join(':')

	if (day === 0) {
		return `сегодня в ${result.slice(9)}`
	} else if (day === 1) {
		return `вчера в ${result.slice(9)}`
	} else {
		return result
	}
}

export default dateFormatter
