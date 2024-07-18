import {Button, Input} from "antd";
import {useState} from "react";
import {createTodo} from "../api/todos";
import {useUserStore} from "../zustand/userStore";
import {Bounce, toast, ToastContainer} from "react-toastify";

const NewTodo = () => {
    const user = useUserStore(state => state.user);
    const [name, setName] = useState("");
    const createTodoHandler = () => {
        console.log(user);
        createTodo({name: name, authorId: user!.id}).then(() => {
            toast.success('TODO was created successfuly', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Bounce,
            });
        });
    }
    return <form>
        <Input placeholder="name" value={name} onChange={e => setName(e.target.value)}/>
        <Button type="primary" onClick={createTodoHandler}>Create</Button>
        <ToastContainer/>
    </form>;
};

export default NewTodo;