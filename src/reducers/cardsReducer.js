const defaultState = {
  results: [],
  loading: false,
  selectedCard: {},
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_CARDS':
    console.log("loading cards")
      return {...state, results: action.payload, loading: !state.loading}
    case 'LOADING':
      return {...state, loading: !state.loading, results: []}
    default:
      return {...state}
  }
}
