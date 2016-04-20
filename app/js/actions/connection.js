export const establishConnection = (uri, secret_key) => ({
    type: 'ESTABLISH_CONNECTION',
    uri,
    secret_key
})
