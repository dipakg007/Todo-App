import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [Todos, setTodos] = useState([]);
  const [Text, setText] = useState("");
  const [Descrip, setDescrip] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().todo,
            description: doc.data().description,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: Text,
      description: Descrip,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText("");
    setDescrip("");
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <p className="navbar-brand">My To-Do List</p>
        </div>
      </nav>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      value={Text}
                      onChange={(event) => setText(event.target.value)}
                      className="form-control"
                      maxLength="50"
                      autoComplete="off"
                      placeholder="Title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      type="text"
                      value={Descrip}
                      onChange={(event) => setDescrip(event.target.value)}
                      cols="30"
                      rows="10"
                      className="form-control"
                      maxLength="500"
                      autoComplete="off"
                      placeholder="Description"
                      required
                    ></textarea>
                  </div>
                  <button
                    disabled={!Text || !Descrip}
                    type="submit"
                    onClick={addTodo}
                    className="btn btn-success btn-block"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-sm-3 text-left">
                <p className="font-weight-bold">Title</p>
              </div>
              <div className="col-sm-5 text-left">
                <p className="font-weight-bold">Description</p>
              </div>
              <div className="col-sm-2 text-left">
                <p className="font-weight-bold">Edit</p>
              </div>
              <div className="col-sm-2 text-left">
                <p className="font-weight-bold">Delete</p>
              </div>
            </div>
            <hr />

            {Todos.map((todo) => {
              return <Todo todo={todo} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
