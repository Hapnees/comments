export const isUsernameValid = (value: string) => {
	const usernamePattern = /^[a-zA-z]+(\d)*$/
	return usernamePattern.test(value)
}
