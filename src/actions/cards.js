import { generateSearchParams } from '../globalFunctions'


export const fetchCards = (searchTerms) => {
  let params = generateSearchParams(searchTerms)
  return (dispatch) => {
    dispatch({
      type: 'LOADING_CARDS'
    })
    return (
      fetch(`http://localhost:3000/cards/search?${params}`)
        .then(res => res.json())
        .then(cards => dispatch({
          type: 'SEARCH_CARDS',
          payload: cards.data
        })
      )
    )
  }
}
