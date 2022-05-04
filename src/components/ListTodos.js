import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import CreateTodos from "./CreateTodos";
import "bootstrap-icons/font/bootstrap-icons.css";

class ListTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleCreation() {
    ReactDOM.render(
      <React.StrictMode>
        <CreateTodos />
      </React.StrictMode>,
      document.getElementById("App")
    );
  }

  handleEdit(e) {
    let todo = JSON.parse(JSON.stringify(e.target.value).trim());
    console.log(todo);
    ReactDOM.render(
      <React.StrictMode>
        <CreateTodos todo={todo} />
      </React.StrictMode>,
      document.getElementById("App")
    );
  }

  handleDelete(e) {
    let todo = JSON.parse(e.target.value.trim());
    console.log(todo);

    if (window.confirm("Are you sure? This operation can not be undone")) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        .then((res) => {
          alert(`Delete success!\n\n${JSON.stringify(todo)}`);
        })
        .catch((reason) => {
          alert(reason);
        });
    }
  }

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
        alert(reason);
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
        alert(reason);
      });
  }

  render() {
    return (
      <div className="App" id="App">
        <div className="container">
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
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={this.handleCreation}
                >
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
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map((todo, index) => (
                  <tr key={index + 1}>
                    <td id={`userId_${index}`}>{todo.userId}</td>
                    <td id={`id_${index}`}>{todo.id}</td>
                    <td id={`title_${index}`}>{todo.title}</td>
                    <td id={`completed_${index}`}>
                      {todo.completed.toString()}
                    </td>
                    <td id={`edit_${index}`}>
                      <button
                        className="btn btn-info"
                        type="button"
                        value={JSON.stringify(todo).trim()}
                        onClick={this.handleEdit}
                      >
                        Edit
                      </button>
                    </td>
                    <td id={`delete_${index}`}>
                      <button
                        className="btn btn-danger"
                        type="button"
                        value={JSON.stringify(todo).trim()}
                        onClick={this.handleDelete}
                      >
                        Delete
                      </button>
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

export default ListTodos;
