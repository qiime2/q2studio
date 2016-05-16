import fetch from 'isomorphic-fetch';

const establishConnectionHidden = (uri, secretKey) => ({
    type: 'ESTABLISH_CONNECTION',
    uri,
    secretKey
});

const establishAvailableAPIList = (availableApis) => ({
    type: 'ESTABLISH_API_LIST',
    availableApis
});

export const establishConnection = (uri, secretKey) => {
    return (dispatch, getState) => {
        dispatch(establishConnectionHidden(uri, secretKey));
        const { connection } = getState();
        fetch(`http://${connection.uri}`, {
            method: 'GET'
        })
        .then((response) => (response.json()))
        .then((json) => (dispatch(establishAvailableAPIList(json.available))));
    };
};
