import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import actions from './actions';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/pages/App';
import reducer from './reducers';
import Flow from './components/pages/Flow';

const logger = createLogger();

let store = createStore(
    reducer,
    applyMiddleware(
      thunk,
      logger
    )
);


const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="job/:pluginId/:flowId" component={Flow} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
