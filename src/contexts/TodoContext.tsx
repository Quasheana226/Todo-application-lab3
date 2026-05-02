

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useMemo,
    useCallback,
} from 'react';

import type { ReactNode } from 'react';
import type { Todo, TodoAction, TodoContextType } from '../types';


//THE REDUCER 
function todoReducer(state: Todo[], action: TodoAction): Todo[] {
    switch (action.type) {

        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: `todo-${Date.now()}`, // gives a unique number
                text: action.payload, // the text the user typed
                completed: false
            }
            return [...state, newTodo];
        }

        //TOGGOLE ID
        case 'TOGGLE_TODO': {
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        }

        case 'CLEAR_COMPLETED': {
            //keep only todos where completed is false 
            return state.filter(todo => !todo.completed);
        }
        default:
            return state;
    }
}

//LOCAL STORAGE HELPERS
const STORAGE_KEY = 'todo-list';
function loadTodos(): Todo[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return []; // nothing saved 
        return JSON.parse(saved) as Todo[];

    } catch {
        return []; // if data is corrupted start fresh 
    }


}
// Create content 

const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => { },
    toggleTodo: () => { },
    deleteTodo: () => { },
    editTodo: () => { },
    clearCompleted: () => { },
});


//THE PROVIDER 
export function TodoProvider({ children }: { children: ReactNode }) {

    const [todos, dispatch] = useReducer(todoReducer, undefined, loadTodos);

    // Autosave — runs every time todos changes.
    // Think of it like Google Docs autosave: every change quietly saves in the background.
    // [todos] = "only re-run when todos changes." Remove this and it saves after EVERY render.
    // Remove this whole block and todos disappear on page refresh.
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); // localStorage only stores text, so we convert the array to a string
    }, [todos]);


    // ---- THE 5 ACTION FUNCTIONS ----
    // These are clean wrappers around dispatch.
    // Components call addTodo("Buy milk") instead of the longer dispatch({...}) call everywhere.
    //
    // useCallback = "don't recreate this function on every render."
    // Without it, child components see a new function reference each render and re-render for no reason.
    // The [] means "this function never changes — no outside variables it depends on."


    // Stops blank or spaces-only todos from being added.
    const addTodo = useCallback((text: string) => {
        if (!text.trim()) return;                              // skip empty input
        dispatch({ type: 'ADD_TODO', payload: text.trim() }); // .trim() strips leading/trailing spaces
    }, []);

    // Sends the id to the reducer — the reducer flips that todo's completed flag.
    const toggleTodo = useCallback((id: string) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    }, []);

    // Removes the todo with this id permanently.
    const deleteTodo = useCallback((id: string) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    }, []);

    // Same blank guard as addTodo — don't save empty text as the new todo.
    const editTodo = useCallback((id: string, newText: string) => {
        if (!newText.trim()) return;
        dispatch({ type: 'EDIT_TODO', payload: { id, newText: newText.trim() } });
    }, []);

    // Sends the signal to wipe all completed todos at once.
    const clearCompleted = useCallback(() => {
        dispatch({ type: 'CLEAR_COMPLETED' });
    }, []);


    // Without this, React creates a NEW value object every render —
    // even if todos didn't change. A new object makes every consumer re-render for no reason.
    // useMemo says: "only rebuild if something in this list actually changed."
    const value = useMemo<TodoContextType>(() => ({
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
    }), [todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted]);


    // Broadcasts the value to every component nested inside <TodoProvider>.
    // {children} = everything wrapped inside this component in JSX — your whole app.
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}


// ============================================================
// CUSTOM HOOK: useTodo
// ============================================================
// A shortcut so components don't have to import TodoContext directly.
// Think of it like a TV remote — easier than reaching behind the TV every time.
// Usage inside any component: const { todos, addTodo } = useTodo();
export function useTodo(): TodoContextType {
    return useContext(TodoContext);
}
