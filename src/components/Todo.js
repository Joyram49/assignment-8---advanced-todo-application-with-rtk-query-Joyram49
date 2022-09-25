import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  useColorSelectedMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useToggleCompletedMutation,
} from "../features/api/apiSlice";

const Todo = ({ todo }) => {
  const { text, completed, color, id } = todo;
  const [editTodo, { isError, isLoading }] = useEditTodoMutation();
  const [toggleCompleted] = useToggleCompletedMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [colorSelected] = useColorSelectedMutation();
  const [inputText, setInputText] = useState(text);
  const [showInput, setShowInput] = useState(false);
  const [colorInput, setColorInput] = useState(color);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    editTodo({
      id,
      text: inputText,
    });
    setShowInput(false);
  };

  const handleColorClick = (value) => {
    colorSelected({ id, color: value });
    setColorInput(value);
  };

  return (
    <div className='flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0'>
      <div
        className={
          completed
            ? `rounded-full bg-white border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 border-green-500 focus-within:border-green-500`
            : "rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2"
        }
      >
        <input
          type='checkbox'
          checked={completed}
          className='opacity-0 absolute rounded-full'
          onChange={() => toggleCompleted({ id, complete: completed })}
        />
        {completed && (
          <svg
            className='fill-current w-3 h-3 text-green-500 pointer-events-none'
            viewBox='0 0 20 20'
          >
            <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
          </svg>
        )}
      </div>

      <div className='select-none flex-1'>
        {showInput ? (
          <form onSubmit={handleUpdateSubmit} className='w-full'>
            <input
              className='block w-full text-sm text-slate-500 px-3 rounded outline-none'
              type='text'
              placeholder=''
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </form>
        ) : (
          text
        )}
      </div>
      {!isLoading && isError && <div>There was an error in editing todo</div>}

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${
          colorInput === "green" ? "bg-green-500" : ""
        }`}
        onClick={() => handleColorClick("green")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${
          colorInput === "yellow" ? "bg-yellow-500" : ""
        }`}
        onClick={() => handleColorClick("yellow")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${
          colorInput === "red" ? "bg-red-500" : ""
        }`}
        onClick={() => handleColorClick("red")}
      ></div>

      <FaEdit
        className='flex-shrink-0 w-4 h-4 ml-2 cursor-pointer text-green-800'
        onClick={() => setShowInput(!showInput)}
      />
      <FaTrashAlt
        className='flex-shrink-0 w-4 h-4 ml-2 cursor-pointer text-red-600'
        onClick={() => deleteTodo(id)}
      />
    </div>
  );
};

export default Todo;
