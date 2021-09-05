import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './app/layout/style.css'
import App from './app/layout/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import petReducer from './stores/pet/reducer'
import accountReducer from './stores/account/reducer'
import ScrollToTop from './app/layout/ScrollToTop'

const rootReducer = combineReducers({
  pets: petReducer,
  account: accountReducer,
})
const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
