import React from "react";
import logo from "./logo.svg";
import "./App.css";

const apiKey = process.env.ELEVEN_LABS_API_KEY ?? "no key found";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>hello world</code>
        </p>
        <p>
          <code>🔑: {apiKey}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
