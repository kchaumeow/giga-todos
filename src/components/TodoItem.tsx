import {GetTodoDTO, updateTodo} from "../api/todos";
import {memo, useState} from "react";
import {Checkbox, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";


const TodoItemComponent = ({todo, handleDelete}: { todo: GetTodoDTO, handleDelete: (id: number) => void }) => {
    const [isChecked, setIsChecked] = useState<boolean>(todo.isChecked);
    const handleCheck = async () => {
        const newChecked = !isChecked;
        await updateTodo(todo.id, {isChecked: newChecked});
        setIsChecked(newChecked);
    };

    return <div
        className="flex gap-1 justify-between p-2 border border-b-4 border-r-4 border-indigo-600 rounded shadow-md">
        <div className="flex flex-col justify-between">
            <Text>{todo.name}</Text>
            {todo.deadline && <Text>deadline: {todo.deadline}</Text>}
        </div>
        <div className='flex flex-col gap-4 items-center '>
            <Checkbox
                color="violet"
                checked={isChecked}
                onChange={handleCheck}/>
            <IconTrash color="red" onClick={() => handleDelete(todo.id)}/>
        </div>

    </div>;
}

export const TodoItem = memo(TodoItemComponent);