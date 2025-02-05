import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import Form from "./Form";

const LSKEY = "MyTodoApp";

export default function App() {
  
  const initialTodos = [
    {
      id: 1,
      name: "Learn React",
      done: false,
    },
    {
      id: 2,
      name: "Be Awesome!",
      done: false,
    },
  ];
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (newTask) => {
    setTodos([...todos, { id: uuidv4(), name: newTask, completed: false }]);
  };

  const handleCheck = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTask = (idToDelete) => {
    console.log(idToDelete)
    setTodos((todos) => todos.filter((todo) => todo.id !== idToDelete))
  }

  return (
    <>
      <header>
        <h1>My Todo App</h1>
      </header>

      <section className="inputTodo">
        <Form addTodo={addTodo} />
      </section>

      <section className="listTodo">
        <h2>Todos</h2>

        <TodoList todos={todos} handleCheck={handleCheck} deleteTask={deleteTask} />

      </section>
    </>
  );
}