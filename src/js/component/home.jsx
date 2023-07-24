import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(responseAsJson => {
        setTodos(responseAsJson.map(i => i.title)); // Changed 'name' to 'title'
      })
      .catch(error => {
        console.log('Looks like there was a problem: \n', error);
      });
  }, []);

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const postComment = (newComment) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
        // Assuming the response contains the new todo data
        setTodos([...todos, response.title]); // Changed 'name' to 'title'
        console.log('Success:', response);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1>To Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What do you need to do?"
          />
        </li>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <i
              className="fas fa-trash"
              onClick={() => handleDeleteTodo(index)}
            ></i>
          </li>
        ))}
      </ul>
      <div>{todos.length} tasks</div>
    </div>
  );
};

export default Home;
