# props 属性传递

在 React 中，属性（`props`）是父组件向子组件传递数据的主要方式。
通过 `props`，父组件可以将状态、函数、对象、数组等任何类型的值传递给子组件。
子组件不能修改传递给它的 `props`，但可以通过回调函数通知父组件进行状态更新。

### 1. 基本属性传递

#### 父组件向子组件传递简单值

```jsx
// 子组件
function ChildComponent(props) {
  return <p>接收到的值: {props.message}</p>;
}

// 父组件
function ParentComponent() {
  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent message="Hello from parent" />
    </div>
  );
}
```

### 2. 传递多个属性

你可以传递多个属性，并且可以在子组件中通过解构赋值来简化代码。

```jsx
// 子组件
function ChildComponent({ message, count }) {
  return (
    <div>
      <p>接收到的消息: {message}</p>
      <p>接收到的计数: {count}</p>
    </div>
  );
}

// 父组件
function ParentComponent() {
  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent message="Hello from parent" count={42} />
    </div>
  );
}
```

### 3. 传递函数作为属性

父组件可以通过 `props` 将函数传递给子组件，以便子组件可以调用这些函数来与父组件交互。

```jsx
// 子组件
function ChildComponent({ onButtonClick }) {
  return (
    <button onClick={onButtonClick}>
      点击我
    </button>
  );
}

// 父组件
function ParentComponent() {
  const handleClick = () => {
    alert('按钮被点击了');
  };

  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent onButtonClick={handleClick} />
    </div>
  );
}
```

### 4. 传递对象和数组

你可以传递复杂的 JavaScript 对象或数组作为 `props`。

```jsx
// 子组件
function ChildComponent({ user }) {
  return (
    <div>
      <p>用户名: {user.name}</p>
      <p>用户年龄: {user.age}</p>
    </div>
  );
}

// 父组件
function ParentComponent() {
  const user = { name: 'Alice', age: 30 };

  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent user={user} />
    </div>
  );
}
```

### 5. 默认属性 (Default Props)

你可以为组件定义默认属性，以确保即使父组件没有传递某些属性，子组件也能正常工作。

```jsx
// 子组件
function ChildComponent({ message = "默认消息" }) {
  return <p>{message}</p>;
}

// 父组件
function ParentComponent() {
  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent />
    </div>
  );
}
```

### 6. 类型检查 (Prop Types)

使用 `prop-types` 包可以帮助你在开发过程中验证传递给组件的 `props` 类型是否正确。

首先安装 `prop-types` 包：

```bash
npm install prop-types
```

然后在组件中使用：

```jsx
import PropTypes from 'prop-types';

function ChildComponent({ message, count }) {
  return (
    <div>
      <p>接收到的消息: {message}</p>
      <p>接收到的计数: {count}</p>
    </div>
  );
}

ChildComponent.propTypes = {
  message: PropTypes.string.isRequired,
  count: PropTypes.number
};

export default ChildComponent;
```

### 7. 属性传播 (Spread Attributes)

你可以使用扩展运算符 (`...`) 来传递所有属性，这在需要传递大量属性时非常有用。

```jsx
// 子组件
function ChildComponent({ message, ...otherProps }) {
  return (
    <div>
      <p>接收到的消息: {message}</p>
      <pre>{JSON.stringify(otherProps, null, 2)}</pre>
    </div>
  );
}

// 父组件
function ParentComponent() {
  const props = {
    message: 'Hello from parent',
    count: 42,
    isActive: true
  };

  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent {...props} />
    </div>
  );
}
```


### 总结

- `基本属性传递`：通过 `props` 传递简单的值。
- `传递函数`：允许子组件与父组件交互。
- `传递复杂数据`：可以传递对象和数组。
- `默认属性`：确保未传递的属性有默认值。
- `类型检查`：使用 `prop-types` 进行属性类型验证。
- `属性传播`：使用扩展运算符传递多个属性。
