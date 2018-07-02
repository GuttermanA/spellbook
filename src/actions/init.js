import { API_ROOT } from '../globalVars'

export const fetchMetaData = () => {

  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    })
    return (
      fetch(`${API_ROOT}/metadata_load`)
        .then(res => res.json())
        .then(payload =>
          dispatch({
          type: 'LOAD_METADATA',
          payload
        })
      )
    )
  }
}
