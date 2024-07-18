import {GetTodoDTO, updateTodo} from "../api/todos";
import {useState} from "react";
import {CheckSquareFilled, PlusSquareOutlined} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";


export const TodoItem = ({todo}: { todo: GetTodoDTO }) => {
    const [isChecked, setIsChecked] = useState(todo.isChecked);
    const [name, setName] = useState(todo.name);
    // const [debouncedName] = useDebounce(name, 1000);
    const handleCheck = () => {
        setIsChecked(!isChecked);
        updateTodo(todo.id, {isChecked: !todo.isChecked});
    };

    console.log(name);

    const handleNameChange = (value: string) => {
        setName(value);
        updateTodo(todo.id, {name: value});
    }
    return <div className="flex gap-1 justify-between p-2">
        <div>
            <Paragraph editable={{onChange: handleNameChange}}>{name}</Paragraph>
            {todo.deadline && <div>deadline: {todo.deadline}</div>}
        </div>
        <div onClick={handleCheck}>{isChecked ? <CheckSquareFilled/> : <PlusSquareOutlined/>}</div>
    </div>;
}