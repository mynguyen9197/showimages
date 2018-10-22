import { combineReducers } from 'redux'
import searchTag from './searchTag'
import showPhoto from './showPhoto'

export default combineReducers({
	searchTag,
	showPhoto
})