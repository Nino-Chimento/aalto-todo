import { Filters } from "components/Filters";
import { Table } from "components/Table";
import { useTodos } from "hooks/useTodos";
import { FC, useEffect, useState } from "react";
import { ITodo } from "types/todo";
import classes from "./todoView.module.scss";
import { useMediaQuery } from "react-responsive";
import { Modal } from "@mui/material";

export const TodoView: FC = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const { todos } = useTodos();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ITodo[]>(todos);
  const [arrayId, setArrayId] = useState([]);
  const [todosCompleted, setTodosCompleted] = useState(false);
  const [isVisibleFiltersMobile, setIsVisibleFiltersMobile] = useState(false);

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
      {isMobile ? (
        <>
          <span
            onClick={() => setIsVisibleFiltersMobile(!isVisibleFiltersMobile)}
            className="karbon-semibold uppercase"
          >
            Filters
          </span>
        </>
      ) : (
        <Filters
          handleReset={handleReset}
          todos={todos}
          handleId={handleId}
          handleCompleted={handleCompleted}
          sendQuery={(query) => filterQuery(query)}
          isMobile={isMobile}
        />
      )}
      {isMobile && isVisibleFiltersMobile && (
        <Modal open={isVisibleFiltersMobile}>
          <Filters
            isMobile={isMobile}
            handleReset={handleReset}
            todos={todos}
            handleId={handleId}
            handleCompleted={handleCompleted}
            sendQuery={(query) => filterQuery(query)}
            handleClose={() => setIsVisibleFiltersMobile(false)}
          />
        </Modal>
      )}

      <Table todos={result.length > 0 ? result : todos} />
    </div>
  );
};
