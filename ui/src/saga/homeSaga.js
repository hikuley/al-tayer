import {call, put, takeLatest} from 'redux-saga/effects';
import movieService from "./../services/MovieService";
import {GET_LIST_REQUEST, getListFailure, getListSuccess} from "../redux/home/Actions";
import {delay} from 'redux-saga';


const getListRequest = function* (action) {
    let params = action.payload;

    const response = yield call(movieService.getMovieList, params);
    const {status, data} = response;

    yield delay(1000);
    if (status && data) {
        yield put(getListSuccess(data));
    }
    else {
        yield put(getListFailure());
    }
};

const HomeSaga = function* () {
    yield takeLatest(GET_LIST_REQUEST, getListRequest);
};

export default HomeSaga;