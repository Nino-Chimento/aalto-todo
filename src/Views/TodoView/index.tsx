
import { Filters } from "components/Filters";
import { Table } from "components/Table";
import { useTodos } from "hooks/useTodos";
import { FC, useEffect, useState } from "react";
import { ITodo } from "types/todo";
import classes from './todoView.module.scss'

export const TodoView:FC = () => {
    const {todos,loading,fetchData} = useTodos()
    const [query,setQuery] = useState('')
    const [result,setResult] = useState(todos)
    const [arrayId,setArrayId] = useState([])
      useEffect(() => {
    fetchData()
       
      },[todos])

    const filterQuery =   (query:string) =>{
        setQuery(query)
        if(result.length > 0){
            const response = result.filter((todo:ITodo) => todo.title.toLowerCase().includes(query.toLowerCase()));
            return setResult(response)
        } 
        const response = todos.filter((todo:ITodo) => todo.title.toLowerCase().includes(query.toLowerCase()));
        return setResult(response)
        
    }

    const handleCompleted = (completed:boolean) => {
        if(completed && result.length === 0) {
            const response = todos.filter((todo:ITodo) => todo.completed === completed)
            setResult(response)
        } else if(completed && result.length > 0) {
            const response = result.filter((todo:ITodo) => todo.completed === completed)
            setResult(response)
        } else if(!completed && !query) {
            setResult(todos)
        }
        else if(!completed && query) {
            const response = todos.filter((todo:ITodo) => todo.title.toLowerCase().includes(query.toLowerCase()));
            setResult(response)
        }
    };

    const handleId = (id:never) => {
            setArrayId([...arrayId,id])
            const response = todos.filter((todo:ITodo) => arrayId.includes(todo.id as never) || todo.id === id);
            setResult(response)
    }

    const handleReset = () => {

        setResult(todos)
    } 
    
   
    
    return <div className={classes.todoView_container}>
    <Filters  handleReset={handleReset} todos={todos}  handleId={handleId} handleCompleted={handleCompleted} sendQuery={(query) => filterQuery(query)}/>
    <Table todos={result.length > 0 ? result: todos}/>
    </div>
}