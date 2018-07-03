import { API_ROOT } from '../globalVars'

export const fetchMetaData = () => {

  return (dispatch) => {
    dispatch({
      type: 'LOADING_INIT'
    })
    return (
      fetch(`${API_ROOT}/metadata_load`)
        .then(res => res.json())
        .then(payload => {
            return (
              dispatch({
                type: 'LOAD_METADATA',
                payload
              })
            )
        })
        .then(()=> {
          dispatch({
            type: 'LOADING_INIT'
          })
        })
    )
  }
}
