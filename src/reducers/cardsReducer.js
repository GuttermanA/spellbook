const defaultState = {
  results: [],
  loading: false,
  selected: {},
  sets: [],
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_CARDS':
      return {...state, loading: !state.loading, results: []}
    case 'LOAD_METADATA':
    console.log('loading cards metadata', action.payload);
      return {...state, sets: action.payload.sets}
    case 'SEARCH_CARDS':
      return {...state, results: action.payload, loading: !state.loading}
    case 'SELECT_CARD':
      return {...state, selected: action.payload}
    default:
      return {...state}
  }
}
