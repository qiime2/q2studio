import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import queryString from 'query-string';

import actions from './actions';
import App from './containers/App';
import Job from './containers/Job';
import reducer from './reducers';

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

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="job/:pluginId/:flowId" component={Job} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

const parseHash = () => {
    const { type } = queryString.parse(location.hash);
    if (type === 'ESTABLISH_CONNECTION') {
        const { uri, secret_key } = queryString.parse(location.hash);
        store.dispatch(actions.establishConnection(uri, secret_key));
        window.history.replaceState('', document.title, window.location.pathname);
    }
};

window.onhashchange = parseHash;

parseHash();
