import { generateSearchParams } from '../globalFunctions'
import { API_ROOT } from '../globalVars'


export const fetchCards = (searchTerms, history) => {
  const params = generateSearchParams(searchTerms, 'card')
  const path = `/cards/search?${params}`
  history.push(path)
  return (dispatch) => {
    dispatch({
      type: 'LOADING_CARDS'
    })

    return (
      fetch(`${API_ROOT}${path}`)
        .then(res => res.json())
        .then(cards => {
          dispatch({
            type: 'SEARCH_CARDS',
            payload: cards.data
          })

        })
    )
  }
}

export const selectCard = (card, sideboard, type, history) => {
  if (history) {
    history.push(`/cards/${card.id}`)
  }
  return {
    type: 'SELECT_CARD',
    payload: {attributes: card, sideboard, type}
  }
}

export const clearCard = () => {
  return {
    type: 'CLEAR_CARD',
  }
}
