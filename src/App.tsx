import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const apiKey = process.env.ELEVEN_LABS_API_KEY;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>hello world</code>
        </p>
        <p>
          <code>key: {apiKey}</code>
        </p>
      </header>
    </div>
  );
}

export default App;