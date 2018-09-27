import React, {Component} from 'react';
import {connect} from "react-redux";
import '../assets/styles.css';

import {getListRequest} from '../redux/home/Actions';
import Loading from "../components/loading/Loading";
import TextSearch from "../components/input/TextSearch";


class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        };
    }

    render() {

        let {fetchDataCompleted, loadingShow, hasError, movieList, message} = this.props.homePageState;

        return (
            <div className="container">

                <form className="search-container">
                    <TextSearch onChange={this.handleChangeInput.bind(this)}/>
                    {loadingShow ? <Loading type="bars" color="#008ABF"/> : ""}
                </form>

                {movieList && fetchDataCompleted ? this._renderMovieList() : ''}

                {message ? <div className="errorMessage"><span>{message}</span></div> : ""}

            </div>
        )
    }

    handleChangeInput(keyword) {
        this.setState({keyword});

        if (keyword.length >= 3) {
            this.props.searchMoviesAction({
                keyword: keyword,
                page: 1
            });
        }

    }

    _renderMovieList = () => {
        let {movieList} = this.props.homePageState;
        let renderMovieList = movieList.map((movie) => {
            let {imdbID, Poster} = movie;
            return (
                <li key={imdbID}>
                    <a href="javascript:">
                        <img src={Poster}/>
                    </a>
                </li>
            )
        });
        return <ul className="image-grid">{renderMovieList}</ul>
    }


}

const bindAction = (dispatch) => {
    return {
        searchMoviesAction: (keyword) => dispatch(getListRequest(keyword))
    }
};

const mapStateToProps = state => ({
    homePageState: state.homeReducer
});

export default connect(mapStateToProps, bindAction)(HomeScreen);
