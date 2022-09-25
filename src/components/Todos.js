import React from "react";
import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import Todo from "./Todo";

const Todos = () => {
  const { data: todos, isLoading, isError } = useGetTodosQuery();
  const filters = useSelector((state) => state.filters);

  const filterByStatus = (todo) => {
    const { status } = filters;
    switch (status) {
      case "Complete":
        return todo.completed;

      case "Incomplete":
        return !todo.completed;

      default:
        return true;
    }
  };

  const filterByColors = (todo) => {
    const { colors } = filters;
    if (colors.length > 0) {
      return colors.includes(todo?.color);
    }
    return true;
  };

  let content = null;

  if (isLoading) {
    content = <div>Loading.....</div>;
  }

  if (!isLoading && isError) {
    content = <div>An error occured!!!</div>;
  }
  if (!isLoading && !isError && todos?.length === 0) {
    content = <div>No Todos found!!!!</div>;
  }
  if (!isLoading && !isError && todos?.length > 0) {
    content = todos
      ?.filter(filterByStatus)
      .filter(filterByColors)
      .map((todo) => <Todo todo={todo} key={todo.id} />);
  }

  return (
    <div className='mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto'>
      {content}
    </div>
  );
};

export default Todos;
