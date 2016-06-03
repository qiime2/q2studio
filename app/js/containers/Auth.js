import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';

const Auth = ({ params: { type }, router, establishConnection }) => {
    if (type === 'ESTABLISH_CONNECTION') {
        establishConnection();
        router.replace('/');
    }
    return null;
};

Auth.propTypes = {
    type: React.PropTypes.string,
    uri: React.PropTypes.string,
    secret_key: React.PropTypes.string,
    router: React.PropTypes.object,
    establishConnection: React.PropTypes.func
};

const mapDispatchToProps = (dispatch, { params: { uri, secret_key } }) => ({
    establishConnection: () => dispatch(actions.establishConnection(uri, secret_key))
});


export default withRouter(
    connect(
        undefined,
        mapDispatchToProps
    )(Auth)
);
