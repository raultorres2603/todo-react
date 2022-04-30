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
    return <ListTodos />;
  }
}

export default App;
