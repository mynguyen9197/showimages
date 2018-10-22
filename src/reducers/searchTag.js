const searchTag = (state= {}, action) => {
	switch (action.type) {
		case 'CHANGE_TAG':
		return {
			tag: action.tag
		}
		default:
		return state
	}
}

export default searchTag