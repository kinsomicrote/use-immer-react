import React from "react";
import {useImmer} from "use-immer";

const Counter = () => {
  const [count, updateCounter] = useImmer({
    value: 0
  });

  function increment() {
    updateCounter(draft => {
      draft.value = draft.value +1;
    });
  }

  return (
    <div>
      <h1>
        Counter {count.value}
      </h1>
      <br />
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;