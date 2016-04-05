import React from 'react';

import style from './HelloWorld.css';

function HelloWorld({ msg }) {
    return (<div className={style.background}>{msg}</div>);
}
HelloWorld.propTypes = {
    msg: React.PropTypes.string.isRequired
};

export default HelloWorld;
