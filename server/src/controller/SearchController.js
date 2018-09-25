import {Action, Get} from "../util/HttpAnnotation";
import MovieService from "../service/MovieService";
import SearchResponse from "../model/SearchResponse";

class SearchController {

    constructor() {
        this.httpRequest = new MovieService();
    }

    @Get("/test")
    index(req, res) {
        let message = "Service is running healthily...";
        res.json({message});
    }

    @Get("/search")
    async search(request, response, next) {
        let {query: {keyword, page}} = request;

        if (!keyword) {
            let error = new Error();
            error.status = 400;
            error.message = "'keyword' is a required field!";
            next(error);
        }

        if (!page) {
            let error = new Error();
            error.status = 400;
            error.message = "'page' is a required field!";
            next(error);
        }

        let requestOptions = {
            "s": keyword,
            "page": page
        };

        let movieList = await this.httpRequest.fetchMovies(requestOptions);

        response.json(new SearchResponse(movieList));
    }


    @Get("/cache/clear")
    async cacheRefresh(request, response, next) {
        await this.httpRequest.flush();

        response.json({message: "ok"});
    }

    @Get("/cache/refresh") //TODO: BONUS
    async cacheRefresh(request, response, next) {
        await this.httpRequest.cacheRefresh();
        response.json({message: "ok"});
    }


}

export default SearchController;