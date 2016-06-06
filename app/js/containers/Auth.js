import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';

class Auth extends React.Component {
    componentWillMount() {
        if (this.props.params.type === 'ESTABLISH_CONNECTION') {
            this.props.establishConnection();
            this.props.router.replace('/');
        }
        return null;
    }

    render() {
        return null;
    }
}

Auth.propTypes = {
    params: React.PropTypes.object,
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
