# 事件处理

在 React 中，事件处理是与用户交互的核心机制之一。
React 使用合成事件（Synthetic Events），这是一种跨浏览器的事件系统，它基于原生 DOM 事件并提供一致的行为。

### 1. 基本事件处理

#### 绑定事件处理器

在 JSX 中，你可以通过在标签上添加事件属性来绑定事件处理器。
事件名称使用驼峰命名法（例如 `onClick` 而不是 `onclick`）。

```jsx
import React, { useState } from 'react';

function Button() {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(true);
  }

  return (
    <button onClick={handleClick}>
      {isClicked ? '已点击' : '点击我'}
    </button>
  );
}

export default Button;
```

### 2. 传递参数给事件处理器

有时你可能需要向事件处理器传递额外的参数。
可以通过箭头函数或部分应用（partial application）来实现。

```jsx
import React, { useState } from 'react';

function ItemList() {
  const items = ['苹果', '香蕉', '橙子'];

  function handleItemClick(item) {
    alert(`你选择了: ${item}`);
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item} onClick={() => handleItemClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
```

### 3. 阻止默认行为

如果你需要阻止某些事件的默认行为（如表单提交时页面刷新），可以使用 `event.preventDefault()` 方法。

```jsx
import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    alert(`提交的用户名: ${username}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        用户名:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <button type="submit">提交</button>
    </form>
  );
}

export default LoginForm;
```

### 4. 处理多个事件

你可以为同一个元素绑定多个事件处理器。

```jsx
import React, { useState } from 'react';

function InputField() {
  const [value, setValue] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleBlur() {
    console.log('输入框失去焦点');
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default InputField;
```

### 5. 事件委托

事件委托是一种优化技术，适用于大量动态生成的元素。
你可以将事件监听器附加到父元素上，而不是每个子元素。

```jsx
import React from 'react';

function EventDelegation() {
  function handleClick(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
      alert(`你选择了: ${event.target.textContent}`);
    }
  }

  return (
    <ul onClick={handleClick}>
      <li>苹果</li>
      <li>香蕉</li>
      <li>橙子</li>
    </ul>
  );
}

export default EventDelegation;
```

### 6. 箭头函数与类方法的区别

在类组件中，使用普通方法作为事件处理器时需要注意绑定问题。
而箭头函数和类属性语法可以简化这一过程。

#### 普通方法（需要绑定）

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this); // 手动绑定
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        点击次数: {this.state.count}
      </button>
    );
  }
}
```

#### 箭头函数（自动绑定）

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        点击次数: {this.state.count}
      </button>
    );
  }
}
```

#### 类属性语法（自动绑定）

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        点击次数: {this.state.count}
      </button>
    );
  }
}
```

### 7. 清除事件监听器

在某些情况下，你可能需要在组件卸载时清除事件监听器以避免内存泄漏。

```jsx
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    function handleResize() {
      console.log('窗口大小改变');
    }

    window.addEventListener('resize', handleResize);

    // 清除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>监控窗口大小变化</div>;
}

export default MyComponent;
```

### 总结

- `基本事件处理`：使用合成事件和事件处理器函数。
- `传递参数`：通过箭头函数或部分应用传递额外参数。
- `阻止默认行为`：使用 `event.preventDefault()`。
- `处理多个事件`：为同一元素绑定多个事件处理器。
- `事件委托`：优化大量动态生成元素的事件处理。
- `箭头函数与类方法`：注意类组件中的绑定问题。
- `清除事件监听器`：避免内存泄漏，确保在组件卸载时清除监听器。
