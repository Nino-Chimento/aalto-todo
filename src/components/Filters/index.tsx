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
    handleReset:() => void
    todos:ITodo[]
}

export const Filters:FC<FiltersProps> = ({sendQuery,handleCompleted,handleId,handleReset,todos})=> {
    const [query,setQuery] = useState('')
    const [completed,setCompleted] = useState(false)
    const [idSelected,setIdSelected] =useState('')
    const handleKeyDown= (e:any) => {
        if (e.key === 'Enter') {
            sendQuery(query);
        }
      }

    const handleSwitch = (completed:boolean) => {
        setCompleted(completed)
        handleCompleted(completed)
    }  

    const resetFilters = () => {
        handleReset()
        setQuery('')
        setCompleted(false)
        setIdSelected('')
     }

     const handleIdSelected = (id:never) => {
         setIdSelected(id)
         handleId(id )
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
             <input value={query} placeholder="Search" onChange={ (e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}/>
         </div>
        </div>
        <div >
            <div> <span className="karbon-semibold uppercase">Completed</span></div>
            <div className={classes.switch_container}>
          <span className="karbon-semibold">{completed ? 'SI' : 'NO'}</span>  <Switch completed={completed}  handleChange={handleSwitch}/>
            </div>
        </div>
        <div className={classes.select_id}>
            <div> <span className="karbon-semibold uppercase">select user id</span></div>
            <div>
                <Select
                className={classes.select_component}
                onChange={(e) =>handleIdSelected(e.target.value as never)}
                value={idSelected}
                >
                    <MenuItem value={''}></MenuItem>
                    {todos && todos.map((todo:ITodo) => <MenuItem key={todo.id} value={+todo.id}>{todo.id}</MenuItem>)}
                </Select>
            </div>
        </div>
        <div className={classes.reset_filters}>
          <span onClick={resetFilters}> Reset filters</span> 
        </div>
    </div>
}