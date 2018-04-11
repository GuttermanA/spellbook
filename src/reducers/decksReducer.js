const defaultState = {
  results: [],
  selected:{},
  loading: false,
  formats:[],
  archtypes: [],
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_DECKS':
      return {...state, loading: !state.loading, results: []}
    case 'LOAD_METADATA':
      console.log('loading deck metdata', action.payload)
      return {...state, formats: action.payload.formats, archtypes: action.payload.archtypes}
    case 'SELECT_DECK':
      return {...state, loading: !state.loading, selected: action.payload }
    case 'SEARCH_DECKS':
      return {...state, loading: !state.loading, results: action.payload }
    default:
      return {...state}
  }
}
