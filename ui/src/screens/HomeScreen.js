import React, {Component} from 'react';
import {connect} from "react-redux";
import '../assets/styles.css';
import searchIcon from './../assets/search-icon.png';
import {getListRequest} from '../redux/home/Actions';


class HomeScreen extends Component {

    constructor() {
        super();
        this.state = {
            keyword: '',
        };
    }

    render() {

        let {fetchDataCompleted, loadingShow, hasError, movieList, message} = this.props.homePageState;

        return (
            <div className="container">

                <form className="search-container">
                    <input id="search-bar" type="text" value={this.state.keyword} onChange={this.handleChangeInput.bind(this)}/>
                    <a href="javascript:">
                        <img className="search-icon" src={searchIcon}/>
                    </a>
                </form>

                {movieList && fetchDataCompleted ? this._renderMovieList() : ''}

            </div>
        )
    }

    handleChangeInput(event) {
        let keyword = event.target.value;
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
