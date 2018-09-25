import Constants from "../config/Constants";

class HttpRequest {

    //token;

    constructor(){

    }

    fetch(request) {
        return new Promise((resolve, reject) => {
            fetch(Constants.BASE_SERVICE_URL, request)
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
}

export default HttpRequest;