import React, { useState, useReducer } from 'react';

export type STORE = {
    count: number;
}

export type ACTIONTYPE = {
    type: string
}

const useCounterReducer = (initialState: STORE) => {
    const reducer: React.Reducer<STORE, ACTIONTYPE> = (state, action) => {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 }
            case 'DECREMENT':
                return { count: state.count - 1 }
            case 'DOUBLE_INCRE':
                return { count: state.count * 2 }
            case 'RESET':
                return { count: 0 }
            default:
                return state
        }
    }

    return useReducer(reducer, initialState);
}

export { useCounterReducer }