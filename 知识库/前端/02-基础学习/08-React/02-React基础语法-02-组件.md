# 组件

在 React 中，组件是构建用户界面的基本单元。

React 组件可以通过两种方式定义：`函数式组件` 和 `类组件`。
随着 React 的发展，函数式组件越来越受欢迎，尤其是结合了 Hooks 之后，它们变得更加强大和灵活。

React 的核心理念之一是组件化。
组件化意味着将复杂的用户界面分解为多个小的、可重用的组件。
每个组件负责渲染一部分 UI，并且可以拥有自己的逻辑和状态。
组件之间通过属性（Props）进行通信，形成树状结构。

### 一、函数式组件

函数式组件是最简单的 React 组件形式。它是一个纯 JavaScript 函数，接收 `props` 作为参数，并返回 JSX。

#### 基本语法

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### 使用箭头函数

你也可以使用箭头函数来定义组件：

```jsx
const Welcome = (props) => <h1>Hello, {props.name}</h1>;
```

#### 示例：带状态的函数式组件

使用 `useState` 钩子可以为函数式组件添加状态管理。

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

### 二、类组件

类组件是基于 ES6 类的 React 组件。
它们需要继承自 `React.Component` 并实现 `render` 方法。

#### 基本语法

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

#### 示例：带状态的类组件

类组件通过构造函数中的 `this.state` 来管理状态，并使用 `this.setState` 来更新状态。

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        <p>当前计数: {this.state.count}</p>
        <button onClick={this.increment}>增加</button>
        <button onClick={this.decrement}>减少</button>
      </div>
    );
  }
}

export default Counter;
```


### 三、使用 Hooks 的函数式组件

从 React 16.8 开始，Hooks 提供了一种更简洁的方式来为函数式组件添加状态和其他功能。
常见的 Hooks 包括 `useState`, `useEffect`, `useContext` 等。

#### 示例：使用 `useState` 和 `useEffect`

```jsx
import React, { useState, useEffect } from 'react';

function FetchData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []); // 空数组表示只在组件挂载时执行一次

  if (loading) {
    return <p>加载中...</p>;
  }

  return (
    <div>
      <h2>从 API 获取的数据</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FetchData;
```

### 四、默认导出与命名导出

你可以选择使用默认导出或命名导出来导出组件。

#### 默认导出

```jsx
// 默认导出
export default function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### 命名导出

```jsx
// 命名导出
export function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 总结

- `函数式组件`：简单直观，适合大多数场景，特别是结合 Hooks 后功能更强大。
- `类组件`：适用于需要复杂生命周期管理和状态管理的场景，但代码相对冗长。
- `Hooks`：提供了更简洁的方式为函数式组件添加状态和其他功能。

