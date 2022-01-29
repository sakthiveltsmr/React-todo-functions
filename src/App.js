import "./App.css";
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");

  const [error, setError] = useState({
    textarea: "",
  });

  const [todos, setTodos] = useState([
    {
      id: 1,
      desc: "Drink Coffee",
      date: new Date("Janury,01,21"),
      completed: true,
    },
    {
      id: 2,
      desc: "Spend 30min for Cats",
      date: new Date("Janury,01,21"),
    },
  ]);

  //handle change()

  let handleChange = ({ target: { name, value, type } }) => {
    setTodo(value);
    // console.log(name, value, type);

    const regex = new RegExp(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g);
    if (value.length < 15 || value.length >= 20) {
      setError({ ...error, text: "words limit 15-20" });
      console.log("error display", error.textarea);
    } else if (!regex.test(value)) {
      console.log("regex working");
      setError({ ...error, textarea: "should not use Special charactors" });
    } else {
      setError({ ...error, textarea: "" });
    }
  };

  // handleSubmit()

  let handleSubmit = (event) => {
    console.log("submited");

    event.preventDefault();

    console.log(todo);

    let obj = {
      desc: todo,
      date: new Date(),
      completed: false,
    };
    setTodos([...todos, obj]);
    setTodo(""); //empty the text-area
  };

  let changeState = (data) => {
    data.completed = !data.completed;

    setTodos([...todos]);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>To do List </h1>
        <textarea
          name="todo"
          value={todo}
          onChange={handleChange}
          rows="2"
        ></textarea>
        <span>{error.textarea}</span>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <div className="list">
        <div className="listItem">
          <ol>
            {todos.map((a) => {
              let button;

              if (a.completed)
                button = <i className="fas fa-check-circle tick"></i>;
              else button = <i className="fas fa-wrong-circle wrong "></i>;

              return (
                <li key={a.desc.toString()}>
                  <span className="btn" onClick={() => changeState(a)}>
                    <h3>{button}</h3>
                  </span>
                  <span className="desc">{a.desc}</span>
                  <span className="date">{a.date.toDateString()}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
