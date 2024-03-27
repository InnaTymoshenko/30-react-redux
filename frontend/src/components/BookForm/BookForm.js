import { useState } from 'react'
import { useDispatch } from 'react-redux'
import createBookWithID from '../../utils/createBookWithID'
import { addBook, thunkFunction } from '../../redux/slices/booksSlice'
import booksData from '../../data/books.json'

import './BookForm.css'

const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthour] = useState('')
	const dispatch = useDispatch()

	const handelAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)
		const randomBook = booksData[randomIndex]
		dispatch(addBook(createBookWithID(randomBook, 'random')))
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (title && author) {
			// const book = createBookWithID({ title, author })
			dispatch(addBook(createBookWithID({ title, author }, 'manual')))
			setTitle('')
			setAuthour('')
		}
	}

	const handelAddRandomBookViaAPI = () => {
		dispatch(thunkFunction)
		// if (res.data && res.data.title && res.data.author) {
		// 	dispatch(addBook(createBookWithID(res.data)))
		// }

		// console.log(res)
	}

	return (
		<div className="app-block book-form">
			<h2>Add a New Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title: </label>
					<input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
				</div>
				<div>
					<label htmlFor="author">Author: </label>
					<input type="text" id="author" value={author} onChange={e => setAuthour(e.target.value)} />
				</div>
				<button type="submit">Add Book</button>
				<button type="button" onClick={handelAddRandomBook}>
					Add Random
				</button>
				<button type="button" onClick={handelAddRandomBookViaAPI}>
					Add Random via API
				</button>
			</form>
		</div>
	)
}

export default BookForm
