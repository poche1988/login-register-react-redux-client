import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app/layout/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import accountReducer from './stores/account/reducer'

//use combine reducer when you have multiple stores
const store = createStore(accountReducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
