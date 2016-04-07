import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
    let visible = todos;
    switch (filter) {
    case 'SHOW_ALL':
        break;
    case 'SHOW_COMPLETED':
        visible = todos.filter(t => t.completed);
        break;
    case 'SHOW_ACTIVE':
        visible = todos.filter(t => !t.completed);
        break;
    default:
        break;
    }
    return visible;
};

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
