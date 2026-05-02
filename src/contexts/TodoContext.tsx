

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
                id: `todo-${Date.now}`, // gives a unique number 
                text: action.played, // the text the user typed 
                completed: false
            }
            return [...state, newTodo];
        }
    }
}
