import React, { useEffect, useState, useReducer, useMemo } from 'react'

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
    const [characters, setCharacters] = useState([])
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then((response) => response.json())
            .then((response) => {
                setCharacters(response.results)
            })

    }, [])

    const handleClick = (favorites) => {
        dispatch(
            {
                type: 'ADD_TO_FAVORITE',
                payload: favorites
            }
        )
    }

    const handleSearch = (evt) => {
        setSearch(evt.target.value)
    }

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
            <div className='Search'>
                <input onChange={handleSearch} type='text' value={search} />
            </div>
            {characters.map(character => (
                <div key={character.id}>
                    <h2>{character.name}</h2>
                    <button onClick={() => handleClick(character)}>Add to favorites</button>
                </div>
            ))}
        </div>
    )
}

export default Character
