import {API} from "./settings.js"

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
    fetch(`${API}/TodoItems`)
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

      fetch(`${API}/TodoItems`, {
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

  removeTodo(todoId) {
    this.todos = this.todos.filter(obj => {
      return obj.id !== todoId
    });

    fetch(`${API}/TodoItems/${todoId}`, {
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