const defaultState = {
  currentUser: {},
  loading: false,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOADING_USER':
      return {...state, loading: !state.loading}
    case 'SET_CURRENT_USER':
      const { id, name } = action.user;
      return { ...state, currentUser: { id, name }, loading: !state.loading };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};
