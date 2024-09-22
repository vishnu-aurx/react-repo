import React, { useEffect, useRef, useState } from 'react'
import { MdEdit,MdDelete,MdDone } from "react-icons/md";
import "./component-css/InputField.css"
interface Todo{
  id:number;
  todo:string;
  isDone:boolean;
}
interface Props{
    todo: Todo;
    key: number;
    todos:Todo[];
    setTodos :React.Dispatch<React.SetStateAction<Todo[]>>
}
const SingleTodo:React.FC<Props>=({todo,key,todos,setTodos})=> {
    const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
    const handleDone = (id:number)=>{
      setTodos(todos.map((todo)=> todo.id===id?{...todo,isDone:!todo.isDone}:todo)
    )};
   const handleDelete = (id:number)=>{
    setTodos(todos.filter((todo)=>todo.id!==id))
   }
  return (
    <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          className='todos__single'
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <MdEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
            <MdDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>

  )
}

export default SingleTodo