# state 状态管理

在 React 中，状态（`state`）用于管理组件内部的数据，并且可以通过多种方式来管理和更新这些数据。
React 提供了内置的状态管理机制，如 `useState` 和 `useReducer` 钩子，
同时也支持使用第三方库（如 Redux、MobX 等）进行更复杂的状态管理。

### 1. 内置状态管理

#### 使用 `useState` 钩子

`useState` 是最常用的 Hook，用于在函数式组件中添加状态。

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
}

export default Counter;
```

#### 使用 `useReducer` 钩子

对于更复杂的状态逻辑，`useReducer` 提供了一种更结构化的方式来管理状态变化。

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>当前计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
    </div>
  );
}

export default Counter;
```

### 2. 上下文 API (`Context`)

当需要在多个层级的组件之间共享状态时，可以使用 React 的上下文 API。
这避免了通过多层组件传递 `props` 的 “prop drilling” 问题。

#### 创建上下文

```jsx
import React, { createContext, useContext, useState } from 'react';

// 创建上下文
const CountContext = createContext();

// 提供者组件
function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

// 消费者组件
function Counter() {
  const { count, setCount } = useContext(CountContext);

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
}

// 根组件
function App() {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
}

export default App;
```

### 3. 第三方状态管理库

对于大型应用或需要更复杂的状态管理时，可以考虑使用第三方库，如 `Redux` 或 `MobX`。

#### Redux

Redux 是一个集中式的状态管理库，适用于管理全局状态。
它通过单一的 store 来存储整个应用的状态，并提供统一的方式来进行状态更新。

##### 安装 Redux 和 React-Redux

```bash
npm install redux react-redux
```

##### 示例代码

```jsx
import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 创建 Store
const store = createStore(counterReducer);

// Counter 组件
function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>增加</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>减少</button>
    </div>
  );
}

// 根组件
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
```

#### MobX

MobX 是另一种流行的状态管理库，它通过可观察对象和反应性编程来简化状态管理。

##### 安装 MobX 和 MobX-React

```bash
npm install mobx mobx-react
```

##### 示例代码

```jsx
import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

// 创建 Store
class CounterStore {
  @observable count = 0;

  @action increment = () => {
    this.count++;
  };

  @action decrement = () => {
    this.count--;
  };
}

const counterStore = new CounterStore();

// Counter 组件
@observer
class Counter extends React.Component {
  render() {
    return (
      <div>
        <p>当前计数: {counterStore.count}</p>
        <button onClick={counterStore.increment}>增加</button>
        <button onClick={counterStore.decrement}>减少</button>
      </div>
    );
  }
}

// 根组件
function App() {
  return <Counter />;
}

export default App;
```

### 总结

- `内置状态管理`：使用 `useState` 和 `useReducer` 可以轻松管理简单的组件状态。
- `上下文 API`：适合在多层级组件之间共享状态，避免 prop drilling。
- `第三方库`：对于复杂的应用，可以使用 Redux 或 MobX 进行全局状态管理。

