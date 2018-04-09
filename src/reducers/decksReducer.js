const defaultState = {
  results: [],
  selected:{},
  loading: false,
  formats:[],

}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_DECKS':
      return {...state, loading: !state.loading, results: []}
    case 'LOAD_FORMATS':
      console.log('loading formats', action.payload)
      return {...state, formats: action.payload}
    case 'SELECT_DECK':
      return {...state, loading: !state.loading, selected: action.payload }
    case 'SEARCH_DECKS':
      return {...state, loading: !state.loading, results: action.payload }
    default:
      return {...state}
  }
}
