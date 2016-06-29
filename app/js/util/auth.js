import CryptoJS from 'crypto-js';

const makeB64Digest = (secretKey, httpVerb, url, requestTime, body = JSON.stringify({})) => {
    const byteArray = CryptoJS.enc.Base64.parse(secretKey);
    const message = [
        httpVerb,
        url,
        requestTime,
        'application/json'
    ];

    if (httpVerb !== 'GET') { message.push(body.length) };

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, byteArray);
    message.forEach(value => hmac.update(value.toString()));
    const hash = hmac.finalize().toString(CryptoJS.enc.Base64);

    return hash;
};

export const fetchAPI = (secretKey, method, url, timestamp, body) => {
    const digest = makeB64Digest(secretKey, method, url, timestamp, body);
    return fetch(url, {
        method,
        headers: new Headers({
            Authorization: `HMAC-SHA256 ${digest}`,
            'Content-Type': 'application/json',
            'X-QIIME-Timestamp': timestamp
        }),
        body: method !== 'GET' ? body : null
    })
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
};
