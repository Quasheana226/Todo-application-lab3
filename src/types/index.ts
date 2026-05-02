

export interface Todo {
    id: string; // unique id 
    text: string; // todo content the user typed 
    completed: boolean // false = active, true =done 
}

//FILETER VALUES 
export type FilterValue = 'all' | 'active' | ' completed';


// Theme Values 
export type ThemeValue = 'light' | 'dark';


