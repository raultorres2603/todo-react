import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";

class listTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
  }

  handleCreation() {}

  handleChangeFilter() {
    // We will manage the change filter from the UserID filter
    let number = document.getElementById("userID");
    // We make the request to the API
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?userId=${number.value}`)
      .then((res) => {
        // Switching length of data response
        if (res.data.length > 0) {
          this.setState({
            todos: res.data,
          });
        } else {
          // Charge all TODO's if length < 0
          axios
            .get(`https://jsonplaceholder.typicode.com/todos`)
            .then((res) => {
              this.setState({
                todos: res.data,
              });
            });
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  componentDidMount() {
    // Una vez de monte el component, se llama a la API para guardar los datos.
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        this.setState(
          {
            todos: res.data,
          },
          () => {
            console.log("TODOS's charged");
            console.log(this.state.todos);
          }
        );
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row mb-3">
            <h1>TECH TEST</h1>
          </div>
          <div className="row">
            <div className="col">
              <h3>Filter:</h3>
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                id="userID"
                placeholder="User ID"
                onChange={this.handleChangeFilter}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <h3>Create:</h3>
            </div>
            <div className="col">
              <div className="d-grid gap-2">
                <button className="btn btn-success" type="button">
                  Create TODO's
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Completed</th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map((todo, index) => (
                  <tr key={index + 1}>
                    <td id={`userId_${index}`} key={index + 2}>
                      {todo.userId}
                    </td>
                    <td id={`id_${index}`} key={index + 3}>
                      {todo.id}
                    </td>
                    <td id={`title_${index}`} key={index + 4}>
                      {todo.title}
                    </td>
                    <td id={`completed_${index}`} key={index + 5}>
                      {todo.completed.toString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default listTodos;
