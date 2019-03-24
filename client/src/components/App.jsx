import React from 'react';
import axios from 'axios';
import TodoListEntry from './TodoListEntry.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priority: 0,
      todos: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.postTodos = this.postTodos.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    axios
      .get('/api/todos')
      .then(response => {
        this.setState({
          todos: response.data
        });
      })
      .catch(err => console.log(err));
  }

  postTodos() {
    const { name, priority } = this.state;
    axios
      .post('/api/todos', { name, priority })
      .then(() => {
        this.getTodos();
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postTodos();
  }

  deleteTodo(_id) {
    axios
      .delete(`/api/todos/${_id}`)
      .then(() => {
        this.getTodos();
      })
      .catch(err => console.log(err));
  }

  updateTodo(index, change) {
    const target = this.state.todos[index];
    const _id = target._id;
    const newPriority = target.priority + change;

    axios
      .put(`/api/todos/${_id}`, { priority: newPriority })
      .then(() => {
        this.getTodos();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <form>
          Todo:
          <input type="text" name="name" onChange={this.handleChange} />
          Priority:
          <input type="number" name="priority" onChange={this.handleChange} />
          <button type="button" onClick={e => this.handleSubmit(e)}>
            Submit
          </button>
        </form>
        {this.state.todos.map((todo, index) => (
          <TodoListEntry
            key={index}
            index={index}
            todo={todo}
            priority={todo.priority}
            deleteTodo={this.deleteTodo}
            updateTodo={this.updateTodo}
          />
        ))}
      </div>
    );
  }
}
