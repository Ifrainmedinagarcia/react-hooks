import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react'
import useCharacter from '../hooks/useCharacter'
import Search from './Search'

const initialState = {
    favorites: []
}

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        default:
            return state
    }
}

const Character = () => {
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
    const [search, setSearch] = useState('')
    const searchInput = useRef(null)
    const { characters } = useCharacter('https://rickandmortyapi.com/api/character')

    const handleClick = (favorites) => {
        dispatch(
            {
                type: 'ADD_TO_FAVORITE',
                payload: favorites
            }
        )
    }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value)
    }, [])

    const filterUsers = useMemo(() => {
        return characters.filter(user => (
            user.name.toLowerCase().includes(search.toLowerCase())
        ))
    }, [characters, search])

    return (
        <div className='Characters'>
            {
                favorites.favorites.map(favorite => (
                    <li
                        key={favorite.id}
                    >
                        {favorite.name}
                    </li>
                ))
            }
            <Search
                search={search}
                searchInput={searchInput}
                handleSearch={handleSearch}
            />
            {filterUsers.map(character => (
                <div key={character.id}>
                    <h2>{character.name}</h2>
                    <button onClick={() => handleClick(character)}>Add to favorites</button>
                </div>
            ))}
        </div>
    )
}

export default Character
