import React from 'react';
import App from './app.js'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

const Root = (props) => (
  <Provider store={props.store}>
    <HashRouter>
      <App state={props.store.getState}/>
    </HashRouter>
  </Provider>
);

export default Root;
