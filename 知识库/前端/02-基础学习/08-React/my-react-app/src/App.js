import React, { createContext, useContext, useState } from "react";

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
