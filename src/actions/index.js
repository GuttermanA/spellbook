import { generateSearchParams } from '../globalFunctions'


export const fetchCards = (searchTerms) => {
  let params = generateSearchParams(searchTerms)
  return (dispatch) => {
    dispatch({
      type: "LOADING"
    })
    return fetch(`http://localhost:3000/cards/search?${params}`)
      .then(res => res.json())
      .then(payload => dispatch({
        type: 'LOAD_CARDS',
        payload
      }))
  }
}
