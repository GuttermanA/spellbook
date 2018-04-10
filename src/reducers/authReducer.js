const defaultState = {
  currentUser: {},
  loading: false,
  currentUserDecks: [],
  errorStatus: false,
  errorMessage: "",
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_USER':
      return {...state, loading: !state.loading}
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.user, loading: !state.loading, errorStatus: !state.error, errorMessage: "" };
    case 'LOAD_CURRENT_USER_DECKS':
      return {...state, currentUserDecks: action.payload }
    case 'LOGOUT_USER':
      return { ...state, currentUser: {}, currentUserDecks: [] };
    case 'LOGIN_ERROR':
      return { ...state, errorStatus: !state.error, errorMessage: action.payload }
    default:
      return state;
  }
};
