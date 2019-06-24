
import React, { useRef } from "react";
import {useImmerReducer } from "use-immer";
import uuidv4 from "uuid/v4"

const initialState = [];

const reducer = (draft, action) => {

  switch (action.type) {
    case "ADD_ITEM":
      draft.push(action.item);
      return;
    case "CLEAR_LIST":
      return initialState;
    default:
      return draft;
  }
}

const Todo = () => {
  const inputEl = useRef(null);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      id: uuidv4(),
      text: inputEl.current.value
    };
    dispatch({ type: "ADD_ITEM", item: newItem });

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
            return <li key={todo.id}>{todo.text}</li>;
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