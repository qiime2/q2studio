import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import App from './containers/App';
import Job from './containers/Job';
import reducer from './reducers';
import Auth from './containers/Auth';

const logger = createLogger();

let store = createStore(
    reducer,
    compose(
        applyMiddleware(
            thunk,
            logger
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="job/:pluginId/:flowId" component={Job} />
            <Route path="type=:type&uri=:uri&secret_key=:secret_key" component={Auth} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
