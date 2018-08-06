import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ConnectedApp } from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import cardsReducer from './reducers/cardsReducer'
import decksReducer from './reducers/decksReducer'
import authReducer from './reducers/authReducer'
import './semantic/dist/semantic.min.css';

const rootReducer = combineReducers({cards: cardsReducer, decks: decksReducer, auth: authReducer })
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(

    <Provider store={store}>
      <ConnectedApp />
    </Provider>

,document.getElementById('root'));
registerServiceWorker();
