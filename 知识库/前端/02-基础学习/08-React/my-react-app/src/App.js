import React from "react";

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  const name = "郑清";
  return (
    <div>
      <Welcome name={name} />
      <p>Welcome to the React app!</p>
    </div>
  );
}

export default App;
