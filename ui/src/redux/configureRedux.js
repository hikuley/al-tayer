import {applyMiddleware, combineReducers, createStore} from 'redux';

import createSagaMiddleware from 'redux-saga'
import configureSaga from "../saga/configureSaga";
import homeReducer from "../redux/home/Reducer"

const reducers = combineReducers({
    homeReducer: homeReducer
});


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(configureSaga);
export default store;