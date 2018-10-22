const showPhoto = (state = { photos: [], curPage: 1}, action) => {
	switch(action.type) {
		case 'ADD_PHOTOS':
			return {
				...state,
				photos: [...state.photos, ...action.photos],
				curPage: action.curPage
			}
		case 'REMOVE_PHOTOS':
			return{
				...state,
				photos: []
			}
		default:
			return state
	}
}

export default showPhoto