import {API} from "./settings.js"
import "./styles/index.css"

interface Todo {
  id: 0,
  description: string;
  done: boolean;
}

export class App {
  heading = "Todos";
  todos: Todo[] = [];
  todoDescription = '';

  created(owningView, myView) {
    console.log("created owningView", owningView, "myView", myView);
    fetch(`${API}/items`)
      .then(response => response.json())
      .then(data => {
        console.log("data", data)
        this.todos = data;
      });

  }

  addTodo() {
    if (this.todoDescription) {
      const todo = {
        description: this.todoDescription,
        done: false
      };
      this.todoDescription = '';

      fetch(`${API}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.todos.push(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    }
  }

  editTodo(Id) {
    const todo = this.todos.filter(obj => {
      return obj.id === Id
    })[0] ?? null;

    if(todo === null) {
      return console.log("invalid todo");
    }

    const postTodo = {
      id: todo.id,
      description: todo.description,
      done: todo.done ? 1 : 0,
    };

    fetch(`${API}/items/${Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postTodo),
    })
    .then(response => {
      console.log('Success:', response);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter(obj => {
      return obj.id !== todoId
    });

    fetch(`${API}/items/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.todos.push(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}