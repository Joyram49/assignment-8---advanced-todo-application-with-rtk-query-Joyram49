import React, { useState } from "react";
import NoteImg from "../images/notes.png";
import PlusImg from "../images/plus.png";
import DoubleTick from "../images/double-tick.png";
import {
  useAddTodoMutation,
  useCompleteAllTodosMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../features/api/apiSlice";

const Header = () => {
  const [addTodo, { isLoading, isError }] = useAddTodoMutation();
  const { data: todos } = useGetTodosQuery();
  const [completeAllTodos] = useCompleteAllTodosMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [input, setInput] = useState("");

  const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
    return maxId + 1;
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    addTodo({
      id: nextTodoId(todos),
      text: input,
      completed: false,
    });
    setInput("");
  };

  const completeHandler = () => {
    todos?.map((todo) => !todo.completed && completeAllTodos(todo.id));
  };

  const clearCompleteHandler = () => {
    const newTodos = todos?.filter((todo) => todo.completed);
    newTodos.map((todo) => deleteTodo(todo.id));
  };

  return (
    <div>
      <form
        className='flex items-center bg-gray-100 px-4 py-4 rounded-md'
        onSubmit={handleInputSubmit}
      >
        <img src={NoteImg} className='w-6 h-6' alt='Add todo' />
        <input
          type='text'
          placeholder='Type your todo'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500'
        />
        <button
          disabled={isLoading}
          type='submit'
          className={`appearance-none w-8 h-8 bg-[url(${PlusImg})] bg-no-repeat bg-contain`}
        ></button>
      </form>

      {!isLoading && isError && <div>There was an error in adding todo</div>}

      <ul className='flex justify-between my-4 text-xs text-gray-500'>
        <li className='flex space-x-1 cursor-pointer' onClick={completeHandler}>
          <img className='w-4 h-4' src={DoubleTick} alt='Complete' />
          <span>Complete All Tasks</span>
        </li>
        <li className='cursor-pointer' onClick={clearCompleteHandler}>
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
