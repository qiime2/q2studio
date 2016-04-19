import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/pages/App';
import reducer from './reducers';

const logger = createLogger();

let store = createStore(
    reducer,
    applyMiddleware(
      thunk,
      logger
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
