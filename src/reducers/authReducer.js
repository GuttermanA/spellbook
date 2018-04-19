const defaultState = {
  currentUser: {},
  currentUserDecks: [],
  currentUserCollection: [],
  loading: false,
  errorStatus: false,
  error:{},
  cardOfTheDay: {},
  deckOfTheDay:{},
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_USER':
      return {...state, loading: true}
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.user, loading: false, errorStatus: false, error:{} };
    case 'LOAD_CURRENT_USER_DATA':
      console.log('user data',action.payload);
      return {...state, currentUserDecks: action.payload.decks, currentUserCollection: action.payload.collection, loading: false }
    case 'UPDATE_CURRENT_USER_COLLECTION':
      return {...state, currentUserCollection: action.payload, loading: false}
    case 'UPDATE_CURRENT_USER_DECKS':
      return {...state, currentUserDecks: action.payload, loading: false}
    case 'LOGOUT_USER':
      return { ...state, currentUser: {}, currentUserDecks: [], currentUserCollection: [] };
    case 'LOGIN_ERROR':
      return { ...state, errorStatus: !state.errorStatus, error: action.payload }
    case 'LOAD_METADATA':
    console.log("card of the day",action.payload.card_of_the_day.data);
    console.log("deck of the day", action.payload.deck_of_the_day.data);
      return { ...state, cardOfTheDay: action.payload.card_of_the_day.data, deckOfTheDay: action.payload.deck_of_the_day.data, loading: false, errorStatus: false, error:{} }
    default:
      return {...state};
  }
};
