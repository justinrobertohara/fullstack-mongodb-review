import React from 'react';

const TodoListEntry = props => {
  const { todo, deleteTodo, index, updateTodo } = props;
  return (
    <div>
      Name: {todo.name} Priority:{todo.priority}
      <button type="button" onClick={() => deleteTodo(todo._id)}>
        DELETE ME
      </button>
      <button type="button" onClick={() => updateTodo(index, 1)}>
        +
      </button>
      <button type="button" onClick={() => updateTodo(index, -1)}>
        -
      </button>
    </div>
  );
};

export default TodoListEntry;
