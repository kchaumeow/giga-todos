import {supabase} from "../main";
import {FiltersParams} from "../components/Filters";

export interface CreateTodoDTO {
    id?: number; // id is optional because it will be assigned by the database
    name: string;
    authorId: string;
    deadline?: string;
}

export interface GetTodoDTO {
    id: number; // id is optional because it will be assigned by the database
    name: string;
    authorId: string;
    isChecked: boolean;
    deadline?: string;
}

export interface UpdateTodoDTO {
    name?: string;
    isChecked?: boolean;
    deadline?: string;
}

export async function createTodo(todo: CreateTodoDTO): Promise<CreateTodoDTO | Error> {
    const {data, error} = await supabase
        .from('todos')
        .insert(todo)
        .single();

    if (error) {
        console.error('Error creating todo:', error);
        throw new Error(error.message);
    }

    return data;
}

function getIsCheckedValue(isChecked?: string) {
    switch (isChecked) {
        case "TRUE":
            return true;
        case "FALSE":
            return false;
        default:
            return null;
    }
}

// Read Todos
export async function getTodosOfUser(authorId: string, filters?: FiltersParams): Promise<GetTodoDTO[]> {

    const isChecked = getIsCheckedValue(filters?.isChecked);

    const sortByDeadline = getIsCheckedValue(filters?.sortByDeadline);

    const result = supabase
        .from('todos')
        .select('*')
        .eq('authorId', authorId);

    if (isChecked !== null) result.eq('isChecked', isChecked);

    if (filters?.deadline) result.eq('deadline', filters.deadline);

    if (sortByDeadline) result.order('deadline', {ascending: true})

    const {data, error} = await result;

    if (error) {
        console.error('Error fetching todos:', error);
        return [];
    }

    return data || [];
}

export async function updateTodo(id: number, updates: Partial<UpdateTodoDTO>): Promise<UpdateTodoDTO | null> {
    const {data, error} = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error updating todo:', error);
        return null;
    }

    return data;
}

export async function deleteTodo(id: number): Promise<void> {
    const {error} = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting todo:', error);
    }
}