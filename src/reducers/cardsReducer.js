const defaultState = {
  results: [],
  loading: false,
  selected: {},
  sets: [],
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_CARDS' || 'LOADING':
      return {...state, loading: !state.loading, results: []}
    case 'LOAD_METADATA':
    console.log('loading cards metadata', action.payload);
      return {...state, sets: action.payload.sets}
    case 'SEARCH_CARDS':
      return {...state, results: action.payload, loading: !state.loading}
    case 'SELECT_CARD':
      console.log('SELECT_CARD',action.payload);
      return {...state, selected: action.payload}
    case 'CLEAR_CARD':
      return {...state, selected: {}}
    default:
      return {...state}
  }
}
