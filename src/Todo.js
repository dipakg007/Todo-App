import React, { useState } from "react";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import db from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const updateTodo = (event) => {
    event.preventDefault();
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
        description: input2,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal
        className={classes.modal}
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1>Update Here</h1>
            <form>
              <div className="form-group">
                <input
                  value={input}
                  placeholder={props.todo.text}
                  onChange={(event) => setInput(event.target.value)}
                  className="form-control"
                  maxLength="50"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <textarea
                  value={input2}
                  placeholder={props.todo.description}
                  onChange={(event) => setInput2(event.target.value)}
                  cols="30"
                  rows="10"
                  className="form-control"
                  maxLength="500"
                  autoComplete="off"
                />
              </div>
              <button
                disabled={!input || !input2}
                type="submit"
                onClick={updateTodo}
                className="btn btn-success btn-block"
              >
                Save
              </button>
            </form>
          </div>
        </Fade>
      </Modal>

      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-left">
              <p>{props.todo.text}</p>
            </div>
            <div className="col-sm-5 text-left">
              <p>{props.todo.description}</p>
            </div>
            <div className="col-sm-2 text-left">
              <EditRoundedIcon
                style={{ cursor: "pointer" }}
                onClick={(e) => setOpen(true)}
              />
            </div>
            <div className="col-sm-2 text-left">
              <DeleteForeverRoundedIcon
                style={{ cursor: "pointer" }}
                onClick={(event) =>
                  db.collection("todos").doc(props.todo.id).delete()
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
