import { generateSearchParams } from '../globalFunctions'
import { API_ROOT } from '../globalVars'

export const fetchMetaData = () => {
  return (dispatch) => {
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
