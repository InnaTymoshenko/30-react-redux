import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'
import createBookWithID from '../../utils/createBookWithID'
import { addBook, fetchBook, selectIsLoadingViaAPI } from '../../redux/slices/booksSlice'
import { setError } from '../../redux/slices/errorSlice'
import booksData from '../../data/books.json'

import './BookForm.css'

const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthour] = useState('')
	const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)
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
		} else {
			dispatch(setError('You must fill title and author'))
		}
	}

	const handelAddRandomBookViaAPI = () => {
		dispatch(fetchBook('http://localhost:4000/random-book-delayed'))

		// if (res.data && res.data.title && res.data.author) {
		// 	dispatch(addBook(createBookWithID(res.data)))
		// }
		// console.log(res)
	}

	// const handelAddRandomBookViaAPI = async () => {
	// 	try {
	// 		setIsLoading(true)
	// 		await dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
	// 	} finally {
	// 		setIsLoading(false)
	// 	}
	// }

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
				<button disabled={isLoadingViaAPI} type="button" onClick={handelAddRandomBookViaAPI}>
					{isLoadingViaAPI ? (
						<>
							<span>Loading Book...</span>
							<FaSpinner className="spinner " />
						</>
					) : (
						'Add Random via API'
					)}
				</button>
			</form>
		</div>
	)
}

export default BookForm
