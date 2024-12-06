import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lws-json-server.vercel.app/",
  }),
  tagTypes: ["todos", "todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: ["todos"],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todos"],
    }),
    editTodo: builder.mutation({
      query: ({ id, text }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: (result, error, arg) => [
        "todos",
        { type: "todo", id: arg.id },
      ],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
    toggleCompleted: builder.mutation({
      query: ({ id, complete }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed: !complete },
      }),
      invalidatesTags: (result, error, arg) => [
        "todos",
        { type: "todo", id: arg.id },
      ],
    }),
    colorSelected: builder.mutation({
      query: ({ id, color }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { color },
      }),
      invalidatesTags: (result, error, arg) => {
        return ["todos", { type: "todo", id: arg.id }];
      },
    }),
    completeAllTodos: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed: true },
      }),
      invalidatesTags: (result, error, arg) => {
        return ["todos"];
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useToggleCompletedMutation,
  useColorSelectedMutation,
  useCompleteAllTodosMutation,
} = apiSlice;
