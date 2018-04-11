const defaultState = {
  sets: [],
  loading,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_CURRENT_USER_COLLECTION':
      return {...state, loading: !state.loading}
    default:
      return {...state}
  }
}
