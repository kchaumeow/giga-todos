import {Button, TextInput} from '@mantine/core';
import {DateInput, DateValue} from '@mantine/dates';
import {FormEvent, useState} from "react";
import {createTodo} from "../api/todos";
import {useUserStore} from "../zustand/userStore";
import {Bounce, toast, ToastContainer} from "react-toastify";

export const NewTodo = () => {
    const user = useUserStore(state => state.user);
    const [name, setName] = useState("");
    const [date, setDate] = useState<DateValue>();
    const createTodoHandler = (e: FormEvent) => {
        e.preventDefault();
        createTodo({name: name, authorId: user!.id, deadline: date?.toDateString()}).then(() => {
            toast.success('TODO was created successfuly', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Bounce,
            });
        }).catch(e => toast.error(e.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Bounce,
        })).finally(() => {
            setName("");
            setDate(null);
        });
    }
    return <form onSubmit={createTodoHandler} className="w-1/2 m-auto pt-20 flex flex-col gap-3">
        <TextInput placeholder="Todo name" label="Todo" value={name} onChange={e => setName(e.target.value)} required/>
        <DateInput
            value={date}
            onChange={setDate}
            label="Deadline"
            placeholder="Deadline for task"
        />
        <Button type="submit"
                variant="gradient"
                gradient={{from: 'violet', to: 'red', deg: 10}}>
            Create
        </Button>
        <ToastContainer/>
    </form>;
};