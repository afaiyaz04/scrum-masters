import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Redux 
import { Provider } from 'react-redux';
import store from './redux/store';
import { increaseCounter, decreaseCounter } from './redux/Counter/counter.actions';

store.subscribe(() => console.log(store.getState()));
store.dispatch(increaseCounter());
store.dispatch(decreaseCounter());
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
