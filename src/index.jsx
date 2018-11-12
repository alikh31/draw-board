import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducer, {})

ReactDOM.render((
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
), document.getElementById('react-root'));
