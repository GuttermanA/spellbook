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
      },
      body: JSON.stringify(deck),
    }
    return (
      fetch(`${API_ROOT}/decks`, options)
        .then(res => res.json())
        .then(deck => dispatch({ type: 'SELECT_DECK', payload: deck.data.attributes }))
        // .then((action) => console.log(action.payload))
        .then((action) => history.push(`/${action.payload.user.name}/decks/${action.payload.id}`))
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
