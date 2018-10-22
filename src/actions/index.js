export const changeTag = tag => ({
	type: 'CHANGE_TAG',
	tag
})

export const addPhotos = data => ({
	type: 'ADD_PHOTOS',
	photos: data.photos,
	curPage: data.curPage
})

export const removePhotos = () => {
	return {
		type: 'REMOVE_PHOTOS'
	}
}