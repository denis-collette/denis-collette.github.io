import React, { useRef } from "react";
import { useState } from "react";

export default function Form({addTodo}) {
    const inputRef = useRef();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const inputElement = inputRef.current;
        const newTask = inputElement.value
        addTodo(newTask);
    }

    return ( 
        <>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name = "newTask" 
            placeholder="Write a new task" 
            ref={inputRef} 
            />
            
            <button type="submit" style={{marginLeft: '10px'}}>Add task</button>
        </form>
        </>
    )
}