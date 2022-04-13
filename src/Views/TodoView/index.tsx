import { Filters } from "components/Filters";
import { Table } from "components/Table";
import { useTodos } from "hooks/useTodos";
import { FC, useEffect, useState } from "react";
import { ITodo } from "types/todo";
import classes from "./todoView.module.scss";

export const TodoView: FC = () => {
  const { todos, fetchData } = useTodos();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ITodo[]>(todos);
  const [arrayId, setArrayId] = useState([]);
  const [todosCompleted, setTodosCompleted] = useState(false);

  useEffect(() => {
    fetchData();
  }, [todos]);

  useEffect(() => {
    filterTodos();
  }, [query, todosCompleted, arrayId]);
  const filterTodos = () => {
    let response: ITodo[] = todos;

    if (query || todosCompleted || arrayId.length > 0) {
      response = todos.filter((todo: ITodo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      if (todosCompleted) {
        response = response.filter((todo: ITodo) => todo.completed);
      }
      if (arrayId.length > 0) {
        response = response.filter((todo: ITodo) =>
          arrayId.includes(todo.id as never)
        );
      }
      return setResult(response);
    }

    setResult(response);
  };

  const filterQuery = (query: string) => {
    setQuery(query);
  };

  const handleCompleted = (completed: boolean) => {
    setTodosCompleted(completed);
  };

  const handleId = (id: never) => {
    setArrayId([...arrayId, id]);
  };

  const handleReset = () => {
    setResult(todos);
    setQuery("");
    setTodosCompleted(false);
    setArrayId([]);
  };

  return (
    <div className={classes.todoView_container}>
      <Filters
        handleReset={handleReset}
        todos={todos}
        handleId={handleId}
        handleCompleted={handleCompleted}
        sendQuery={(query) => filterQuery(query)}
      />
      <Table todos={result.length > 0 ? result : todos} />
    </div>
  );
};
