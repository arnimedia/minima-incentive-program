import { createSlice, createSelector } from '@reduxjs/toolkit'

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState: {
        spinning: 0,
    },
    reducers: {
        startSpinner: (state) => {
            state.spinning++
        },
        stopSpinner: (state) => {
            state.spinning--
        },
    },
})

export const { startSpinner, stopSpinner } = spinnerSlice.actions

export default spinnerSlice.reducer

///// selectors
const selectSpinner = (state) => state.spinner
export const selectSpinning = createSelector(selectSpinner, (state) => state.spinning > 0)
