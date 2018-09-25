import React, {Component} from "react";
import {connect} from "react-redux";
import '../../assets/styles.css';

class MovieItemContainer extends Component {

    render() {
        return (
            <div></div>

        )
    }
}

const bindAction = (dispatch) => {
    return {}
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(MovieItemContainer);
