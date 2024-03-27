import { useDispatch, useSelector } from 'react-redux'
import {
	setTitleFilter,
	selectTitleFilter,
	setAuthorFilter,
	selectAuthorFilter,
	setOnlyFavoriteFilter,
	selectOnlyFavoriteFilter,
	resetFilters
} from '../../redux/slices/filterSlice'

import './Filter.css'

const Filter = () => {
	const dispatch = useDispatch()
	const titleFilter = useSelector(selectTitleFilter)
	const authorFilter = useSelector(selectAuthorFilter)
	const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

	const handleTitleFilterChange = e => {
		dispatch(setTitleFilter(e.target.value))
	}
	const handleAuthorFilterChange = e => {
		dispatch(setAuthorFilter(e.target.value))
	}

	const handleOnlyFavoriteFilterChange = () => {
		dispatch(setOnlyFavoriteFilter())
		// dispatch(setOnlyFavoriteFilter(e.target.checked))
	}

	const handleResetFilters = () => {
		dispatch(resetFilters())
	}

	return (
		<div className="app-block filter">
			<div className="filter-row">
				<div className="filter-group">
					<input value={titleFilter} onChange={handleTitleFilterChange} type="text" placeholder="Filter by title" />
				</div>
				<div className="filter-group">
					<input value={authorFilter} onChange={handleAuthorFilterChange} type="text" placeholder="Filter by author" />
				</div>
				<div className="filter-group">
					<label>
						<input type="checkbox" checked={onlyFavoriteFilter} onChange={handleOnlyFavoriteFilterChange} />
						Only Favorite
					</label>
				</div>
				<button type="button" onClick={handleResetFilters}>
					Reset Filters
				</button>
			</div>
		</div>
	)
}

export default Filter
