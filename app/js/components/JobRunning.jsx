// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import React from 'react';

import style from '../../css/JobRunning.css';

const JobRunning = () => (
    <div className={style.loading}>
        <div>
            <div className={style.c1}></div>
            <div className={style.c2}></div>
            <div className={style.c3}></div>
            <div className={style.c4}></div>
        </div>
        <span>loading</span>
    </div>
);

JobRunning.displayName = 'JobRunning';

export default JobRunning;
