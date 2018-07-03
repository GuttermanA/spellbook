const defaultState = {
  loading: false,
  errorStatus: false,
  error:{},
  cardOfTheDay: {},
  deckOfTheDay:{},
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_INIT':
      return {...state, loading: !state.loading}
    default:
      return {...state}

  }
}
