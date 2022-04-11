import {  faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { Switch } from "components/Switch";

import { useState } from "react";
import { FC } from "react";
import { ITodo } from "types/todo";
import classes from './filters.module.scss'

interface FiltersProps {
    sendQuery: (query:string) => void
    handleCompleted:(e:boolean) => void
    handleId:(id:never) => void
    todos:ITodo[]
}

export const Filters:FC<FiltersProps> = ({sendQuery,handleCompleted,handleId,todos})=> {
    const [query,setQuery] = useState('')
    const [completed,setCompleted] = useState(false)
    const handleKeyDown= (e:any) => {
        if (e.key === 'Enter') {
            sendQuery(query);
        }
      }

    const handleSwitch = (completed:boolean) => {
        setCompleted(completed)
        handleCompleted(completed)
    }  

    
    

    return <div className={classes.filters_container}>
        <div className={classes.filters_container_title}>
           <span className="karbon-semibold">Filters</span> 
        </div>
        <div className={classes.search_container}>
         <div className={classes.iconSearch}>
             <FontAwesomeIcon icon={faSearch} color='white' size='1x' />
         </div>
         <div>
             <input placeholder="Search" onChange={ (e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}/>
         </div>
        </div>
        <div >
            <div> <span className="karbon-semibold uppercase">Completed</span></div>
            <div className={classes.switch_container}>
          <span className="karbon-semibold">{completed ? 'SI' : 'NO'}</span>  <Switch handleChange={handleSwitch}/>
            </div>
        </div>
        <div className={classes.select_id}>
            <div> <span className="karbon-semibold uppercase">select user id</span></div>
            <div>
                <Select
                className={classes.select_component}
                onChange={(e) =>handleId(e.target.value as never)}
                >
                    {todos && todos.map((todo:ITodo) => <MenuItem value={todo.id}>{todo.id}</MenuItem>)}
                </Select>
            </div>
        </div>
        <div className={classes.reset_filters}>
          <span> Reset filters</span> 
        </div>
    </div>
}