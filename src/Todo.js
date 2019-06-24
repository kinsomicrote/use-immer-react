import React, { useRef } from "react";
import {useImmerReducer } from "use-immer";

const initialState = [];

const reducer = (draft, action) => {

  switch (action.type) {
    case "ADD_ITEM":
      draft.push(action.payload);
      return;
    case "clear":
      return initialState;
    default:
      throw new Error();
  }
}

const Todo = () => {
  const inputEl = useRef(null);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  console.log('state', state)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const todoobj = {
      text: inputEl.current.value,
      done: false
    };
    dispatch({ type: "ADD_ITEM", payload: todoobj });

    inputEl.current.value = "";
    inputEl.current.focus();
  }
  
  const handleClear = () => {
    dispatch({ type: 'CLEAR_LIST' })
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <ul>
          {state.map(todo => {
            return <li>{todo.text}</li>;
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type='text' ref={inputEl} />
          <button
            type='submit'
          >
            Add Todo
          </button>
        </form>
        <button
          onClick={handleClear}
        >
          Clear Todos
        </button>
      </header>
    </div>
  );
}

export default Todo;