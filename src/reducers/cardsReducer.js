const defaultState = {
  results: [],
  loading: false,
  selected: {},
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_CARDS':
    console.log("loading cards")
      return {...state, results: action.payload, loading: !state.loading}
    case 'LOADING_CARDS':
      return {...state, loading: !state.loading, results: []}
    default:
      return {...state}
  }
}
