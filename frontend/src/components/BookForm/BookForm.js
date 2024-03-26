import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addBook } from '../../redux/books/actionCreaters'
import booksData from '../../data/books.json'

import './BookForm.css'

const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthour] = useState('')
	const dispatch = useDispatch()

	const handelAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)
		const randomBook = booksData[randomIndex]
		const randomBookWithID = {
			...randomBook,
			id: uuidv4()
		}

		dispatch(addBook(randomBookWithID))
		// console.log(randomBookWithID)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (title && author) {
			const book = {
				title,
				author,
				id: uuidv4()
			}
			dispatch(addBook(book))
			setTitle('')
			setAuthour('')
		}
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
			</form>
		</div>
	)
}

export default BookForm
