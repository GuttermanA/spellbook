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
    case 'LOADING_DECKS':
      return {...state, loading: !state.loading, results: [], errorStatus: false, error: {}}
    case 'LOAD_METADATA':
      console.log('loading deck metdata', action.payload)
      return {...state, formats: action.payload.formats, archtypes: action.payload.archtypes}
    case 'SELECT_DECK':
    console.log(action.payload);
      return {...state, loading: !state.loading, selected: action.payload, errorStatus: false, error: {} }
    case 'SEARCH_DECKS':
      return {...state, loading: !state.loading, results: action.payload, errorStatus: false, error: {} }
    case 'DECK_ERROR':
      return { ...state, errorStatus: !state.errorStatus, error: action.payload }
    default:
      return {...state}
  }
}
