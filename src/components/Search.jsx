import React from 'react'

const Search = ({ search, searchInput, handleSearch }) => {
    return (
        <div className='Search'>
            <input onChange={handleSearch} type='text' ref={searchInput} value={search} />
        </div>
    )
}

export default Search
