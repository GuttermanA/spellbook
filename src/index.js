import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import cardsReducer from './reducers/cardsReducer'

const rootReducer = combineReducers({cards: cardsReducer})
const store = createStore(rootReducer, applyMiddleware(thunk))

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
,document.getElementById('root'));
registerServiceWorker();
