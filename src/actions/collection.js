import { API_ROOT } from '../globalVars'

export const addToCollection = (collectionCards, history) => {
  return (dispatch) => {
    dispatch({type:'LOADING_USER'})
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify(collectionCards),
    }
    return (
      fetch(`${API_ROOT}/collections`, options)
        .then(res => res.json())
        .then(collection => console.log(collection))
        .then(collection => dispatch({ type: 'UPDATE_CURRENT_USER_COLLECTION', payload: collection}))
        .then((action) => history.push(`/${action.payload.user.name}/collection`))
    )
  }
}
