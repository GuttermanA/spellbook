import { adapter } from '../services';

export const fetchUser = () => dispatch => {
  dispatch({ type: 'LOADING_USER' });
  adapter.auth.getCurrentUser()
    .then(res => {
      console.log(res)

      dispatch({ type: 'SET_CURRENT_USER', user: res.data.attributes });
    });
};

export const loginUser = (username, password, history) => dispatch => {
  dispatch({ type: 'LOADING_USER' });

  adapter.auth.login({ username, password }).then(res => {
    console.log(res)
    if (res.error) {

    } else {
      localStorage.setItem('token', res.jwt);
      dispatch({ type: 'SET_CURRENT_USER', user: res.user.data.attributes });
      history.push('/');
    }

  });
};

export const logoutUser = () => {
  localStorage.removeItem('token')
  return {
    type: 'LOGOUT_USER'
  }
}
