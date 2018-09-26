import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({type}) => (
    <ReactLoading type={type} style={{margin: 'auto', height: '10%', width: '20%'}}/>
);

export default Loading;