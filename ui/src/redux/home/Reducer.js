import {GET_LIST_REQUEST, GET_LIST_SUCCESS, GET_LIST_FAILURE} from "./Actions";

const initialState = {
    movieList: null,
    fetchDataCompleted: false,
    hasError: false,
    loadingShow: false,
    message: null
};

export default function (state = initialState, action) {

    let {payload} = action;

    if (action.type == GET_LIST_REQUEST) {
        return {
            ...state,
            fetchDataCompleted: false,
            loadingShow: true,
            hasError: false,
            message:null
        }
    }

    if (action.type == GET_LIST_SUCCESS) {
        return {
            ...state,
            fetchDataCompleted: true,
            movieList: payload,
            hasError: false,
            loadingShow: false,
            message:null
        }
    }

    if (action.type == GET_LIST_FAILURE) {
        return {
            ...state,
            fetchDataCompleted: false,
            movieList: null,
            message: "There is no movie by your searching.",
            hasError: true,
            loadingShow: false
        }
    }

    return state;

}