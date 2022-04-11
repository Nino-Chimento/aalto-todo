
import { FC,  useState } from "react";
import classes from './table.module.scss'
import { ITodo } from "types/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons'
import { Pagination } from "@mui/material";

interface TableProps {
    todos:ITodo[]
}

export const Table:FC<TableProps> = ({todos}) => {
    const [page, setPage] = useState(1);
    
      const handleChange = (event:any, value:number) => {
        setPage(value);
      };
     
    return <>
        <div className={classes.table_container}>
        <table className={classes.table}>
      <thead>
        <tr className="karbon-semibold">
          <th  scope="col">user id</th>
          <th scope="col">title</th>
          <th scope="col">completed</th>
        </tr>
      </thead>
     <br />
      <tbody>
        {todos &&
          todos.slice(page * 5 -5,page * 5).map((todo:ITodo) => (
            <tr key={todo.id}>
              <th>{todo.id}</th>
              <th>{todo.title}</th>
              <th>{todo.completed ?<FontAwesomeIcon icon={faCheck} color='lightblue' size='1x' />:<FontAwesomeIcon icon={faClose} color='lightblue' size='1x' />}</th>
            </tr>
          ))}
      </tbody>
    </table>
    <div className={classes.pagination_container}><Pagination   page={page} onChange={handleChange}   count={parseInt((todos.length / 5).toFixed(0))}  color="primary"/></div>
    
   </div>
    </>
}