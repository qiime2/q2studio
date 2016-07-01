import { fetchAPI } from '../util/auth';


export const foundTypes = (typeList) => ({
    type: 'FOUND_TYPES',
    typeList
});


const memoizeSubtype = (results) => ({
    type: 'MEMOIZE_SUBTYPE',
    results
});

export const checkTypes = () => {
    return (dispatch, getState) => {
        const {
            artifacts: { artifacts },
            connection: { uri, secretKey },
            superTypes: { knownTypes }
        } = getState();
        const artifactTypes = artifacts.map(({ type }) => type);
        const url = `http://${uri}/api/types/subtype`;
        const body = {
            a: artifactTypes,
            b: Array.from(knownTypes)
        };
        fetchAPI(secretKey, 'POST', url, body)
        .then(json => dispatch(memoizeSubtype(json)));
    };
};
