import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import type { ReactNode } from 'react'

import type { FilterContextType, FilterValue } from '../types'


// FilterContext with default value to provide type safety 
const FilterContext = createContext<FilterContextType>({
    filter: 'all',
    setFilter: () => { },
});

export function FilterProvider({ children }: { children: ReactNode }) {

    const [filter, setFilterState] = useState<FilterValue>('all');


    const setFilter = useCallback((newFilter: FilterValue) => {
        setFilterState(newFilter);
    }, []);

    const value = useMemo(
        () => ({ filter, setFilter }),
        [filter, setFilter]
    );

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter(): FilterContextType {
    return useContext(FilterContext);
}

