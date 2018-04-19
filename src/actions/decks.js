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
            history.push(`/${res.data.attributes.user.name}/decks/${res.data.attributes.id}`)
            return dispatch({ type: 'SELECT_DECK', payload: res.data.attributes })
          }
        })
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


export const selectDeck = (deck, history, currentUser) => {

  if (deck.user.id === currentUser.id) {
    history.push(`/${currentUser.name}/decks/${deck.id}`)
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

export const updateDeck = (deckId, cardsToUpdate, cardsToDelete) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING_DECKS'
    })
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({ cardsToUpdate, cardsToDelete })
    }
    return (
      fetch(`${API_ROOT}/decks/${deckId}/deck_cards`, options)
        .then(res => res.json())
        .then(response => {
          if (response.error) {
            return dispatch({ type: 'DECK_ERROR', payload: response.error })
          } else {
            dispatch({ type: 'SELECT_DECK', payload: response.data.attributes })
          }
        })
    )
  }
}

export const deleteFromDeck = (cards, deckId) => {
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
      body: JSON.stringify({ cards })
    }
    return (
      fetch(`${API_ROOT}/decks/${deckId}/deck_cards`, options)
        .then(res => res.json())
        .then(response => {
          if (response.error) {
            return dispatch({ type: 'DECK_ERROR', payload: response.error })
          } else {
            dispatch({ type: 'SELECT_DECK', payload: response.data.attributes })
          }
        })
    )
  }
}
