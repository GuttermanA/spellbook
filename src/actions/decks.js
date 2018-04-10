import { generateSearchParams } from '../globalFunctions'
import { API_ROOT } from '../globalVars'

export const fetchDeckMetaData = () => {
  return (dispatch) => {
    return (
      fetch(`${API_ROOT}/deck_metadata_load`)
        .then(res => res.json())
        .then(payload =>
          dispatch({
          type: 'LOAD_DECK_METADATA',
          payload
        })
      )
    )
  }
}

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
      },
      body: JSON.stringify(deck),
    }
    return (
      fetch(`${API_ROOT}/decks`, options)
        .then(res => res.json())
        .then(payload => dispatch({ type: 'SELECT_DECK', payload }))
        // .then((action) => console.log(action.payload))
        .then((action) => history.push(`/decks/${action.payload.data.id}`))
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
