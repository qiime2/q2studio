import React, { PropTypes } from 'react';

import style from './Todo.css';

const Todo = ({ onClick, completed, text }) => (
    <li
        onClick={onClick}
        className={completed ? style.complete : style.active }
    >
        {text}
    </li>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;
