import { API_ROOT } from '../globalVars'

export const addToCollection = (collectionCards, history) => {
  return (dispatch) => {
    dispatch({type:'LOADING_USER'})
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(collectionCards),
    }
    return (
      fetch(`${API_ROOT}`, options)
        .then(res => res.json())
        .then(collection => console.log(collection))
        // .then(collection => dispatch({ type: 'UPDATE_CURRENT_USER_COLLECTION', payload: collection.data.attributes}))
        // .then((action) => history.push(`/${action.payload.user.name}/collection`))
    )
  }
}
