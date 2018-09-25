import HttpRequest from "../util/HttpRequest";

class MovieService {

    constructor() {
        this.httpRequest = new HttpRequest();
    }

    getMovieList = (params) => {
        return this.httpRequest.fetch({
            path: "/api/search",
            method: "GET",
            params: params
        });
    };

    getMovieDetail = (params) => {
        return this.httpRequest.fetch({
            path: "/api/detail",
            method: "GET",
            params: params
        });
    };
}

export default MovieService;