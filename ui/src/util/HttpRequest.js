import Constants from "../config/Constants";

class HttpRequest {

    //token;

    constructor() {

    }

    fetch(requestOptions) {


        return new Promise((resolve, reject) => {

            let url = this._createUrl(requestOptions);
            const overriddenHeaders = requestOptions.headers || {};
            const {method} = requestOptions;
            const {params} = requestOptions;
            const {body} = requestOptions;

            const processedRequestOptions = {
                ...requestOptions,
                headers: {
                    "Content-Type": "application/json",
                    ...overriddenHeaders
                },
                timeout: Constants.HTTP_TIMEOUT_MS
            };

            fetch(url, processedRequestOptions)
                .then(res => res.json())
                .then(res => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        });


    }

    _createUrl(requestOptions) {

        const {params} = requestOptions;
        let url = requestOptions.apiPath || Constants.BASE_SERVICE_URL;
        url = requestOptions.path ? (url + requestOptions.path) : url;

        if (params) {
            url += '?';
            for (const [key, value] of Object.entries(params)) {
                url += `${key}=${value}&`;
            }
        }

        return url;
    }
}

export default HttpRequest;