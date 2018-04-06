const defaultState = {
  results: [],
  loading: false,
  selected: {},
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_CARDS':
      return {...state, loading: !state.loading}
    case 'SEARCH_CARDS':
      return {...state, results: action.payload, loading: !state.loading}
    default:
      return {...state}
  }
}
