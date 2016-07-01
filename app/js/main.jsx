import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/pages/App';
import Job from './containers/Job';
import reducer from './reducers';
import Auth from './containers/Auth';
import DevTools from './util/devtools';
import JobHistory from './components/JobHistory';
import ArtifactDetail from './components/ArtifactDetail';

import '!style-loader!css-loader!../css/main.css';

let store;

if (process.env.NODE_ENV === 'production') {
    store = createStore(
        reducer,
        applyMiddleware(
            thunk
        )
    );
}

if (process.env.NODE_ENV === 'development') {
    store = createStore(
        reducer,
        compose(
            applyMiddleware(
                thunk
            ),
            DevTools.instrument()
        )
    );
    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers').default)
        );
    }
}

const history = syncHistoryWithStore(hashHistory, store);


render(
    <div>
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App} />
                <Route path="job/:pluginId/:actionType/:jobId" component={Job} />
                <Route path="type=:type&uri=:uri&secret_key=:secret_key" component={Auth} />
                <Route path="job/:id" component={JobHistory} />
                <Route path="artifact/:id" component={ArtifactDetail} />
            </Router>
        </Provider>
        {process.env.NODE_ENV === 'development' ? <DevTools store={store} /> : null }
    </div>,
    document.getElementById('root')
);
