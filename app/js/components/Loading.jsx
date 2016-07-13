import React from 'react';

import style from '../../css/Loading.css';

const Loading = ({ loaded, status }) => (
    loaded ?
        null :
        <div className={style.wrapper}>
            <div className={style.loaderBox}>
                <div className={style.loader}>
                </div>
                <p className={style.label}>
                    {status}
                </p>
            </div>
        </div>
);

Loading.propTypes = {
    loaded: React.PropTypes.bool.isRequired,
    status: React.PropTypes.string.isRequired
};

export default Loading;
