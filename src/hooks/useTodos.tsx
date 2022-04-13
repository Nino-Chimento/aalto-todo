import { useEffect, useState } from "react";

export const useTodos = () => {
  const [loading, setLoaiding] = useState(false);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoaiding(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const result = await response.json();
      setTodos(result);

      return result;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoaiding(false);
    }
  };
  return { fetchData, loading, todos };
};
