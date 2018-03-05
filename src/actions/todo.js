let nextTodoId = 0;

export function todoIsActive(bool) {
  return {
    type: 'TODO_IS_ACTIVE',
    isActive: bool
  };
}

export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
};

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
};
