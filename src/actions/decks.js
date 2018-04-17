import { generateSearchParams } from '../globalFunctions'
import { API_ROOT } from '../globalVars'

export const createDeck = (deck, history) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING_DECKS'
    })
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify(deck),
    }
    return (
      fetch(`${API_ROOT}/decks`, options)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.error) {
            return dispatch({ type: 'DECK_ERROR', payload: res.error })
          } else {
            return dispatch({ type: 'SELECT_DECK', payload: res.data.attributes })
          }
        })
        .then((action) => action.type === 'SELECT_DECK' ? history.push(`/${action.payload.user.name}/decks/${action.payload.id}`) : null)
    )
  }
}

export const fetchDecks = (searchTerms) => {
  let params = generateSearchParams(searchTerms, 'deck')
  return (dispatch) => {
    dispatch({
      type: 'LOADING_DECKS'
    })
    return (
      fetch(`${API_ROOT}/decks/search?${params}`)
        .then(res => res.json())
        .then(decks => dispatch({
          type: 'SEARCH_DECKS',
          payload: decks.data
        })
      )
    )
  }
}

export const fetchDeck = (deckId) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING_DECKS'
    })
    return (
      fetch(`${API_ROOT}/decks/${deckId}`)
        .then(res => res.json())
        .then(deck => {
          dispatch({
            type: 'SELECT_DECK',
            payload: deck.data.attributes
          })
        })
    )
  }
}


export const selectDeck = (deck, history, user) => {
  if (user) {
    history.push(`${deck.user.name}/decks/${deck.id}`)
  } else {
    history.push(`/decks/${deck.id}`)
  }

  return {
    type: 'SELECT_DECK',
    payload: deck
  }
}

export const deleteDeck = (deckId, history, user) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING_DECKS'
    })
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
    }
    return (
      fetch(`${API_ROOT}/decks/${deckId}`, options)
        .then(res => res.json())
        .then(response => {
          if (response.error) {
            return dispatch({ type: 'DECK_ERROR', payload: response.error })
          } else {
            dispatch({
              type: 'LOADING_DECKS'
            })
            history.push(`/${user.name}/decks`, {message: response.message })
          }
        })
    )
  }
}
