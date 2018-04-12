const defaultState = {
  currentUser: {},
  currentUserDecks: [],
  currentUserCollection: [],
  loading: false,
  errorStatus: false,
  error:{},
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_USER':
      return {...state, loading: !state.loading}
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.user, loading: !state.loading, errorStatus: false, error:{} };
    case 'LOAD_CURRENT_USER_DATA':
      console.log(action.payload);
      return {...state, currentUserDecks: action.payload.decks, currentUserCollection: action.payload.collection, loading: !state.loading }
    case 'UPDATE_CURRENT_USER_COLLECTION':
      return {...state, currentUserCollection: action.payload, loading: !state.loading}
    case 'LOGOUT_USER':
      return { ...state, currentUser: {}, currentUserDecks: [] };
    case 'LOGIN_ERROR':
      console.log(action.payload);
      return { ...state, errorStatus: !state.errorStatus, error: action.payload }
    default:
      return state;
  }
};
