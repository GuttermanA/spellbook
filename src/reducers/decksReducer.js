const defaultState = {
  results: [],
  selected:{},
  loading: false,
  formats:[],
  archtypes: [],
  errorStatus: false,
  error: {},
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_DECKS' || 'LOADING':
      return {...state, loading: !state.loading, results: [], selected:{}, errorStatus: false, error: {}}
    case 'LOAD_METADATA':
      console.log('loading deck metdata', action.payload)
      return {...state, formats: action.payload.formats, archtypes: action.payload.archtypes, loading: false}
    case 'SELECT_DECK':
    console.log('SELECTING_DECK',action.payload);
      return {...state, loading: false, selected: action.payload, errorStatus: false, error: {} }
    case 'SEARCH_DECKS':
      console.log('SEARCH_DECKS', action.payload);
      return {...state, loading: false, results: action.payload, errorStatus: false, error: {} }
    case 'DECK_ERROR':
      return { ...state, errorStatus: !state.errorStatus, error: action.payload, loading: false }
    default:
      return {...state}
  }
}
