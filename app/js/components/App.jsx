import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

import style from './App.css';
import examplePic from '../../img/Example.png';

const App = () => (
    <div className={style.center}>
        <img src={examplePic} />
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default App;
