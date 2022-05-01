import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ListTodos from "./components/ListTodos";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainCont">
        <div className="row mb-3 text-center">
          <h1>TECH TEST</h1>
        </div>
        <ListTodos />
      </div>
    );
  }
}

export default App;
