import {supabase} from "../main";

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

export async function createTodo(todo: CreateTodoDTO): Promise<CreateTodoDTO | null> {
    const {data, error} = await supabase
        .from('todos')
        .insert(todo)
        .single();

    if (error) {
        console.error('Error creating todo:', error);
        return null;
    }

    return data;
}

// Read Todos
export async function getTodosOfUser(authorId: string, sorting?: { ascending?: boolean, column: string }): Promise<GetTodoDTO[]> {
    const ascending = sorting?.ascending || false;
    const column = sorting?.column || "createdAt";

    const {data, error} = await supabase
        .from('todos')
        .select('*')
        .eq('authorId', authorId)
        .order(column, {ascending: ascending})

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