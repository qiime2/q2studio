import React from 'react';

import style from './Loading.css';

const Loading = ({ loaded }) => (
    loaded ?
        null :
        <div className={style.wrapper}>
            <div className={style.loaderBox}>
                <div className={style.loader}>
                </div>
                <p className={style.label}>
                    Connecting...
                </p>
            </div>
        </div>
);

Loading.propTypes = {
    loaded: React.PropTypes.bool.isRequired
};

export default Loading;
