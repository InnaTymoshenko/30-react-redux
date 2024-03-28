import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithID from '../../utils/createBookWithID'
import { setError } from './errorSlice'

const initialState = []

export const fetchBook = createAsyncThunk('books/fetchBook', async (url, thunkAPI) => {
	// console.log(thunkAPI)
	try {
		const res = await axios.get(url)
		// console.log(res.data)
		return res.data
	} catch (error) {
		// console.log(error)
		thunkAPI.dispatch(setError(error.message))
		throw error
	}
})

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.push(action.payload)
		},
		deleteBook: (state, action) => {
			return state.filter(book => book.id !== action.payload)
		},
		toggleFavorite: (state, action) => {
			state.forEach(book => {
				if (book.id === action.payload) {
					book.isFavorite = !book.isFavorite
				}
			})
		}
	},
	// extraReducers: {
	// 	[fetchBook.fulfilled]: (state, action) => {
	// 		if (action.payload.title && action.payload.author) {
	// 			state.push(createBookWithID(action.payload, 'API'))
	// 		}
	// 	}
	// }
	extraReducers: builder => {
		builder.addCase(fetchBook.fulfilled, (state, action) => {
			if (action.payload.title && action.payload.author) {
				state.push(createBookWithID(action.payload, 'API'))
			}
			// state.push(action.payload)
		})
	}
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

// export const thunkFunction = async (dispatch, getState) => {
// 	try {
// 		const res = await axios.get('http://localhost:4000/random-book')
// 		if (res?.data?.title && res?.data?.author) {
// 			dispatch(addBook(createBookWithID(res.data, 'API')))
// 		}
// 	} catch (error) {
// 		console.log('Error fetching random book')
// 	}
// }

export const selectBooks = state => state.books

export default booksSlice.reducer
