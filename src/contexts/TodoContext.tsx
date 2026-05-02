

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