# Lecture Review Answers

## 1. Explain using code examples what is meant by props and state in React JS?

### Props (Properties)

Props are used to pass data from a parent component to a child component. They are immutable, meaning that the child component cannot modify the props it receives. Props allow you to create dynamic and reusable components by passing different data to the same component.

```
// ParentComponent
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const message = 'Hello from ParentComponent!';

  return (
    <div>
      <ChildComponent message={message} />
    </div>
  );
};

// ChildComponent
import React from 'react';

const ChildComponent = (props) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};

export default ChildComponent;
```

In this example, ParentComponent passes the message prop to ChildComponent, which then displays it. Props are accessed using the props object inside the child component.

### State

State is used to manage the internal state of a component. Unlike props, state can be changed by the component itself, and when the state changes, the component re-renders. State is initialized in the constructor of a class component or using the useState hook in a functional component.

```
// FunctionalComponent
import React, { useState } from 'react';

const FunctionalComponent = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
};

export default FunctionalComponent;
```

In this functional component example, the useState hook is used to initialize and update the state. Clicking the "Increment" button updates the state, triggering a re-render of the component.
