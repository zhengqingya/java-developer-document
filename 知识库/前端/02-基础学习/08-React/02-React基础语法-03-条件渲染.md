# 条件渲染

在 React 中，条件渲染是一种根据特定条件显示或隐藏组件或元素的技术。
React 提供了多种方式来实现条件渲染，包括使用条件运算符、逻辑运算符和三元运算符等。

以下是一些常见的条件渲染方法。

### 1. 使用条件运算符（`if` 语句）

你可以在组件的 `render` 方法或函数组件的返回值中使用 `if` 语句来实现条件渲染。

#### 类组件示例

```jsx
import React, { Component } from 'react';

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    if (this.state.isLoggedIn) {
      return <h1>欢迎回来！</h1>;
    }
    return <h1>请登录。</h1>;
  }
}

export default Greeting;
```

#### 函数组件示例

```jsx
import React, { useState } from 'react';

function Greeting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <h1>欢迎回来！</h1>;
  }
  return <h1>请登录。</h1>;
}

export default Greeting;
```

### 2. 使用逻辑运算符 (`&&`)

逻辑运算符 `&&` 可以用于条件渲染，当条件为真时，渲染相应的元素。

```jsx
import React, { useState } from 'react';

function Greeting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>欢迎访问我们的网站！</h1>
      {isLoggedIn && <h2>欢迎回来！</h2>}
      {!isLoggedIn && <h2>请登录。</h2>}
    </div>
  );
}

export default Greeting;
```

### 3. 使用三元运算符 (`condition ? true : false`)

三元运算符是一种简洁的方式来根据条件渲染不同的元素。

```jsx
import React, { useState } from 'react';

function Greeting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>欢迎访问我们的网站！</h1>
      {isLoggedIn ? <h2>欢迎回来！</h2> : <h2>请登录。</h2>}
    </div>
  );
}

export default Greeting;
```

### 4. 使用函数

你可以将条件渲染逻辑封装在一个函数中，使代码更清晰。

```jsx
import React, { useState } from 'react';

function Greeting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function renderGreeting() {
    if (isLoggedIn) {
      return <h2>欢迎回来！</h2>;
    }
    return <h2>请登录。</h2>;
  }

  return (
    <div>
      <h1>欢迎访问我们的网站！</h1>
      {renderGreeting()}
    </div>
  );
}

export default Greeting;
```

### 5. 使用组件

将不同的条件渲染逻辑封装到不同的组件中，可以使代码更具可读性和可维护性。

```jsx
import React, { useState } from 'react';

function Welcome() {
  return <h2>欢迎回来！</h2>;
}

function Login() {
  return <h2>请登录。</h2>;
}

function Greeting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>欢迎访问我们的网站！</h1>
      {isLoggedIn ? <Welcome /> : <Login />}
    </div>
  );
}

export default Greeting;
```


### 6. 使用 `React.Fragment` 或 `<>`

在条件渲染时，有时需要返回多个元素。可以使用 `React.Fragment` 或简写的 `<>` 来包裹这些元素。

```jsx
import React, { useState } from 'react';

function Greeting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h1>欢迎访问我们的网站！</h1>
      {isLoggedIn ? (
        <>
          <h2>欢迎回来！</h2>
          <p>很高兴再次见到你。</p>
        </>
      ) : (
        <>
          <h2>请登录。</h2>
          <p>登录后可以享受更多功能。</p>
        </>
      )}
    </>
  );
}

export default Greeting;
```

### 7. 使用 `key` 属性

在条件渲染时，如果渲染的元素类型不同，确保为每个元素提供唯一的 `key` 属性，以帮助 React 识别哪些元素发生了变化。

```jsx
import React, { useState } from 'react';

function Greeting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>欢迎访问我们的网站！</h1>
      {isLoggedIn ? (
        <h2 key="welcome">欢迎回来！</h2>
      ) : (
        <h2 key="login">请登录。</h2>
      )}
    </div>
  );
}

export default Greeting;
```

### 总结

- 条件运算符 (`if`)：在 `render` 方法或函数组件中使用 `if` 语句。
- 逻辑运算符 (`&&`)：用于条件渲染，当条件为真时渲染元素。
- 三元运算符 (`condition ? true : false`)：简洁地根据条件渲染不同的元素。
- 函数`：将条件渲染逻辑封装到函数中。
- 组件`：将不同的条件渲染逻辑封装到不同的组件中。
- `React.Fragment` 或 `<>`：包裹多个元素，避免不必要的 DOM 结构。
- `key` 属性：为条件渲染的元素提供唯一的 `key` 属性。

