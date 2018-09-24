
class SearchResponse {
    constructor(data) {
        this.data = data;
        this.status = data.length != 0;
    }
}

export default SearchResponse;