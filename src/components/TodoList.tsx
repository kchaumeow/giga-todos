import {deleteTodo, GetTodoDTO, getTodosOfUser} from "../api/todos";
import {TodoItem} from "./TodoItem";
import {useUserStore} from "../zustand/userStore";
import {useEffect, useState} from "react";
import {Filters} from "./Filters";
import {useFilters} from "../hooks/useFilters";

export const TodoList = () => {
    const user = useUserStore(state => state.user);

    const {filters} = useFilters();

    const [todos, setTodos] = useState<GetTodoDTO[]>([]);

    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

    useEffect(() => {
        if (user) {
            getTodosOfUser(user!.id, filters).then((res) => {
                setTodos(res);
            })
        }
    }, [user, JSON.stringify(filters)]);

    return <div className="w-1/2 m-auto pt-20">
        <div className="mb-10">
            <Filters/>
        </div>

        <div className="flex flex-col gap-4">
            {todos.map(todo => {
                return <div key={todo.id}>
                    <TodoItem todo={todo} handleDelete={handleDelete}/>
                </div>
            })}
        </div>
    </div>
}