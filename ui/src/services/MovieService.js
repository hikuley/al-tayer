import HttpRequest from "../util/HttpRequest";

class MovieService {

    constructor() {
        this.httpRequest = new HttpRequest();
    }

    getMovieList = (params) => {
        return this.httpRequest.fetch({
            path: "/movieService/search",
            method: "GET",
            params: params
        });
    };

    getMovieDetail = (params) => {
        return this.httpRequest.fetch({
            path: "/movieService/detail",
            method: "GET",
            params: params
        });
    };
}

export default new MovieService();