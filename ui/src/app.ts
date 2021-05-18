import {API} from "./settings.js"

interface Todo {
  description: string;
  done: boolean;
}

export class App {
  heading = "Todos";
  todos: Todo[] = [];
  todoDescription = '';

  created(owningView, myView) {
    console.log("created");
    fetch(`${API}/TodoItems`)
      .then(response => response.json())
      .then(data => console.log("data", data));

  }

  addTodo() {
    if (this.todoDescription) {
      this.todos.push({
        description: this.todoDescription,
        done: false
      });
      this.todoDescription = '';
    }
  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}