

export interface Todo {
    id: string; // unique id 
    text: string; // todo content the user typed 
    completed: boolean // false = active, true =done 
}

//FILETER VALUES 
export type FilterValue = 'all' | 'active' | ' completed';


// THEME VALUES 
export type ThemeValue = 'light' | 'dark';


// REDUCER ACTIONS 

export type TodoAction = | { type: 'ADD_TODO'; payload: string } // text 
    | { type: 'TOGGLE_TODO', payload: string }//ID
    | { type: 'DELETE_TODO', payload: string } //ID
    | { type: 'EDIT_TODO', payload: { id: string; newText: string } } // ID + New Text
    | { type: 'CLEAR_COMPLETED' }


// CONTEXT VALUE SHAPES
//Provides the global state todos and the new and neccary methods to perform CRUD on task



// What todo COntext shares 
export interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, mewText: string) => void;
    clearCompleted: () => void;
}

// What Filtercontext shares

export interface FilterContextType {
    filter: FilterValue;
    setFilter: (filter: FilterValue) => void;

}

export interface ThemeContextType {
    theme: ThemeValue;
    toggleTheme: () => void;

}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: TaskStatus;
    dueDate: string;
}

export interface TaskFormProps {
    onAddTask: (task: Task) => void;
    taskToEdit: Task | null;
    onCancel: () => void;
}

export interface TaskFilterCriteria {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
    search?: string;
}

export interface TaskFilterProps {
    onFilterChange: (criteria: TaskFilterCriteria) => void;
}