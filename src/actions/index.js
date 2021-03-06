let nextTodoId = 0

const addTodoItem = text => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

const setVisibilityFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

export { addTodoItem, setVisibilityFilter, toggleTodo }