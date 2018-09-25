import Constants from "../config/Costants";
import fetch from 'node-fetch';
import NodeCache from 'node-cache';

class MovieService {

    constructor() {
        const ttlSeconds = Constants.CACHE_TIMEOUT; // cache for 1 minutes

        this.cache = new NodeCache({stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false});
    }

    fetchMovies(options) {

        let urls = [];
        urls.push(this.prepareUrl(options)); //first url
        options.page++;
        urls.push(this.prepareUrl(options)); //second url


        let cacheKey = this.generateCacheKey(options);
        const value = this.cache.get(cacheKey);

        if (value) {
            console.log("This request cached before...");
            return Promise.resolve(value);
        }

        let requests = urls.map(url => this.fetch(url));

        return new Promise((resolve, reject) => {

            /**
             * fetching for all url..
             */

            Promise.all(requests)

                .then(responses => {
                    let movies = [];
                    responses.forEach((rsp) => {
                        let {Response, Search} = rsp;
                        if (Response == "True") {
                            Search.forEach(searchItem => {
                                movies.push(searchItem);
                            });
                        }
                    });
                    console.log("This request does not cached before...");
                    this.cache.set(cacheKey, movies);
                    resolve(movies);

                })

                .catch(err => {
                    console.log(err);
                    reject(err);
                });

        });
    }

    fetch(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    resolve(json)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });

    }

    cacheRefresh() {

        //Todo: BONUS
        //this.flush();

        const keys = this.cache.keys();

        let requests = keys.map((urlParams) => {
            let url = `${Constants.BASE_URL}?apikey=${Constants.API_KEY}&${urlParams}`;
            let promise = this.fetch(url);
            return promise;
        });

        return new Promise((resolve, reject) => {

            Promise.all(requests)

                .then(responses => {
                    console.log(responses);
                    let movies = [];
                    responses.forEach((rsp) => {
                        let {Response, Search} = rsp;
                        if (Response == "True") {
                            Search.forEach(searchItem => {
                                movies.push(searchItem);
                            });
                        }
                    });
                    console.log("This request does not cached before...");
                    //this.cache.set(cacheKey, movies);
                    resolve(movies);

                })

                .catch(err => {
                    console.log(err);
                    reject(err);
                });

        });


    }

    prepareUrl(options) {
        let urlParams = "";
        for (const [key, value] of Object.entries(options)) {
            urlParams += `${key}=${value}&`;
        }
        return `${Constants.BASE_URL}?apikey=${Constants.API_KEY}&${urlParams}`;
    }

    generateCacheKey(options) {
        let urlParams = '';
        for (const [key, value] of Object.entries(options)) {
            urlParams += `${key}=${value}&`;
        }
        return urlParams;
    }

    flush() {
        this.cache.flushAll();
    }

    del(keys) {
        this.cache.del(keys);
    }

}

export default MovieService;