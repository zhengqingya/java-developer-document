# 钩子 Hooks

React Hooks 是 React 16.8 引入的一个新特性，允许你在不编写类的情况下使用状态和其他 React 特性。
Hooks 使得函数组件能够拥有状态和其他 React 特性，如生命周期方法。

以下是关于 React Hooks 的详细介绍：

### 一、基本 Hooks

#### 1. `useState`

`useState` 是用于在函数组件中添加状态的 Hook。

**语法：**

```jsx
const [state, setState] = useState(initialState);
```


**示例：**

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}

export default Counter;
```

#### 2. `useEffect`

`useEffect` 用于在函数组件中执行副作用操作，如数据获取、订阅或手动修改 DOM。

**语法：**

```jsx
useEffect(didUpdate);
```

**示例：**

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `你点击了 ${count} 次`;
  }, [count]); // 仅在 count 变化时执行

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}

export default Example;
```

### 二、额外的 Hooks

#### 3. `useContext`

`useContext` 用于在函数组件中访问 React 上下文。

**语法：**

```jsx
const value = useContext(MyContext);
```

**示例：**

```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme === 'dark' ? 'black' : 'white' }}>
      我是一个主题按钮
    </button>
  );
}

export default ThemedButton;
```

#### 4. `useReducer`

`useReducer` 用于管理复杂的状态逻辑，类似于 Redux 中的 reducer。

**语法：**

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**示例：**

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
    <>
      计数: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}

export default Counter;
```

#### 5. `useCallback`

`useCallback` 用于缓存函数，避免不必要的重新创建。

**语法：**

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

**示例：**

```jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <p>计数: {count}</p>
    </div>
  );
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>点击我</button>;
}

export default ParentComponent;
```

#### 6. `useMemo`

`useMemo` 用于缓存计算结果，避免不必要的重新计算。

**语法：**

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**示例：**

```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);

  const expensiveValue = useMemo(() => {
    // 假设这是一个耗时的计算
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum;
  }, []);

  return (
    <div>
      <p>计数: {count}</p>
      <p>耗时计算结果: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
    </div>
  );
}

export default ExpensiveComponent;
```

#### 7. `useRef`

`useRef` 用于创建一个可变的引用，其值在组件的整个生命周期内保持不变。

**语法：**

```jsx
const refContainer = useRef(initialValue);
```

**示例：**

```jsx
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>聚焦输入框</button>
    </>
  );
}

export default TextInputWithFocusButton;
```

### 三、自定义 Hooks

自定义 Hooks 允许你将组件逻辑提取到可重用的函数中。

**示例：**

```jsx
import React, { useState, useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function Counter() {
  const [count, setCount] = useState(0);

  useDocumentTitle(`你点击了 ${count} 次`);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}

export default Counter;
```

### 四、使用 Hooks 的规则

1. **只在顶层调用 Hooks**：不要在循环、条件或嵌套函数中调用 Hooks。
2. **只在 React 函数中调用 Hooks**：不要在普通的 JavaScript 函数中调用 Hooks，除非你正在编写自定义 Hook。

### 五、总结

- **`useState`**：用于添加状态。
- **`useEffect`**：用于执行副作用操作。
- **`useContext`**：用于访问 React 上下文。
- **`useReducer`**：用于管理复杂的状态逻辑。
- **`useCallback`**：用于缓存函数。
- **`useMemo`**：用于缓存计算结果。
- **`useRef`**：用于创建可变的引用。
- **自定义 Hooks**：用于提取可重用的逻辑。

通过这些 Hooks，你可以更高效地编写 React 函数组件，使代码更加简洁和易于维护。

### 六：具体的应用场景

- 数据获取: 使用 useEffect 和 useState 来从 API 获取数据。
- 表单管理: 使用 useState 来管理输入框的状态，并处理提交。
- 动画: 使用 useEffect 来设置动画的入场和离场。
- 订阅: 在 useEffect 中添加订阅，返回一个清理函数以取消订阅。
- 组合逻辑: 使用自定义 Hooks 来提取组件之间共享的逻辑。
