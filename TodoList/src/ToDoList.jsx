import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const ToDoList = () => {
    return (
    <>
    <header>
        <h1>My Todo App</h1>
    </header>
    
    <section className='inputTodo'>
        <form action="">
            <input type="text" />
        </form>
        <button type='submit'>Add Todo</button>
    </section>
    
    <section className='listTodo'>
        <h2>Todos</h2>
            <input type='checkbox' id='todo1'/>
            <label htmlFor="todo1">Learn React</label>
            <br/>
            <input type='checkbox' id='todo2'/>
            <label htmlFor="todo2">Be Awesome!</label>
    </section>
    </>
)}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ToDoList />
    </StrictMode>,
)