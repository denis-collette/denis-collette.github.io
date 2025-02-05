import React, { useState } from "react";

export default function TodoList({todos, handleCheck, deleteTask}) {
    return (
        <>
        <ul style={{ listStyle: "none" }}>
            {todos.map((todo) => (
            <li key={todo.id}>
                <input
                type="checkbox"
                id={todo.id}
                name={todo.name}
                checked={todo.done}
                onChange={() => handleCheck(todo.id)}
                style={{ marginRight: "10px" }}
                />

                <label
                htmlFor={todo.id}
                style={{ textDecoration: todo.done ? "line-through" : "none" }}
                >
                {todo.name}
                </label>

                <button
                onClick={() => deleteTask(todo.id)}
                style={{ marginLeft: "10px" }}>
                    Delete
                </button>
            </li>
            ))}
        </ul>
        </>
    );
}
