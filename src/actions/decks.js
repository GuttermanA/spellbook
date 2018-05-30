import { generateSearchParams } from '../globalFunctions'
import { API_ROOT } from '../globalVars'

export const createDeck = (deck, history, copy = false) => {
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
      body: JSON.stringify({...deck, copy}),
    }
    return (
      fetch(`${API_ROOT}/decks`, options)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          if (json.error) {
            return dispatch({ type: 'DECK_ERROR', payload: json.error })
          } else {
            history.push(`/${json.data.attributes.userName}/decks/${json.data.attributes.id}`)
            dispatch({ type: 'UPDATE_CURRENT_USER_DECKS', payload: json.data})
            return dispatch({ type: 'SELECT_DECK', payload: json.data.attributes })
          }
        })
    )
  }
}

export const fetchDecks = (searchTerms, history) => {
  const params = generateSearchParams(searchTerms, 'deck')
  const path = `/decks/search?${params}`
  history.push(path)
  return (dispatch) => {
    dispatch({
      type: 'LOADING_DECKS'
    })
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-type': 'application/json',
    //     Authorization: localStorage.getItem('token')
    //   },
    // }
    return (
      fetch(`${API_ROOT}${path}`)
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

  if (deck.userId === currentUser.id) {
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
            const decks = response.user.data.attributes.decks.data
            const collection = response.user.data.attributes.collection.data

            dispatch({ type: 'LOAD_CURRENT_USER_DATA', payload: {decks, collection} })
            history.push(`/${user.name}/decks`, {message: response.message })
          }
        })
    )
  }
}

export const updateDeck = (deck) => {
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
      body: JSON.stringify(deck)
    }
    return (
      fetch(`${API_ROOT}/decks/${deck.id}`, options)
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
