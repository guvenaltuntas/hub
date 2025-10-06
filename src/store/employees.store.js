import { configureStore, createSlice } from '@reduxjs/toolkit';

function setItemsToStorage(items) {
    var newValue = JSON.stringify(items);
    //Limiting local storage size because of domain limit in browsers except chrome
    if (newValue.length < 5242880) {
        localStorage.setItem('employeeList', JSON.stringify(items));
    }
}

const employeesSlice = createSlice({
    name: 'employeeList',
    initialState: JSON.parse(localStorage.getItem('employeeList') || '[]'),
    reducers: {
        add: (state, action) => {
            const newEmployee = {
                ...action.payload,
                id: `employee${new Date().getTime()}`
            };
            state.push(newEmployee);
            setItemsToStorage(state);
        },
        update: (state, action) => {
            const { id, patch } = action.payload;
            const foundIndex = state.findIndex((item) => {
                return item.id === id
            });
            if (foundIndex >= 0) {
                state[foundIndex] = { ...state[foundIndex], ...patch};
                setItemsToStorage(state);
            }
        },
        remove: (state, action) => {
            const foundIndex = state.findIndex((item) => item.id === action.payload);
            if (foundIndex >= 0) {
                state.splice(foundIndex, 1);
                setItemsToStorage(state);
            }
        }
    }
});

export const { add, update, remove } = employeesSlice.actions;

export const employeesStore = configureStore({
    reducer: {
        employeeList: employeesSlice.reducer
    }
});
