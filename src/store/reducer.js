import { SET_TODO_INPUT } from './constants';
import { ADD_TODO } from './constants';

const initState = {
    todos: [],
    todoInput: '',
};

function reducer(state, action) {
    switch (action.type) {
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: action.payload,
            };

        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        default:
            throw new Error('Invalid actions.');
    }
}

export { initState };
export default reducer;
