import CryptoJS from 'crypto-js';

export const makeB64Digest = (secretKey, httpVerb, url, requestTime, body = JSON.stringify({})) => {
    const byteArray = CryptoJS.enc.Base64.parse(secretKey);
    const message = [
        httpVerb,
        url,
        requestTime,
        'application/json',
        body.length
    ];

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, byteArray);
    message.map(value => hmac.update(value.toString()));
    const hash = hmac.finalize().toString(CryptoJS.enc.Base64);

    return hash;
};
