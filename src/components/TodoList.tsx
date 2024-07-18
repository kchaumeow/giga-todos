import {GetTodoDTO, getTodosOfUser} from "../api/todos";
import {TodoItem} from "./TodoItem";
import {useUserStore} from "../zustand/userStore";
import {useEffect, useState} from "react";

export const TodoList = () => {
    const user = useUserStore(state => state.user);

    const [todos, setTodos] = useState<GetTodoDTO[]>([]);

    useEffect(() => {
        if (user) {
            getTodosOfUser(user!.id).then((res) => {
                setTodos(res);
            })
        }
    }, [user]);

    return <div className="divide-y divide-slate-400 w-1/2 m-auto pt-20">
        {todos.map(todo => {
            return <div key={todo.id}>
                <TodoItem todo={todo}/>
            </div>
        })}
    </div>
}