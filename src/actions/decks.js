export const fetchFormats = () => {
  return (dispatch) => {
    return (
      fetch(`http://localhost:3000/formats`)
        .then(res => res.json())
        .then(payload => dispatch({
          type: 'LOAD_FORMATS',
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
      fetch(`http://localhost:3000/decks`, options)
        .then(res => res.json())
        .then(payload => dispatch({ type: 'SELECT_DECK', payload }))
        // .then((action) => console.log(action.payload))
        .then((action) => history.push(`/decks/${action.payload.data.id}`))
    )
  }
}
