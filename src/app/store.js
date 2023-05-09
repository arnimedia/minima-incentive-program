import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './../account/account.slice'
import homeReducer from './../home/home.slice'
import spinnerReducer from './spinner/spinner.slice'

export default configureStore({
    reducer: {
        account: accountReducer,
        home: homeReducer,
        spinner: spinnerReducer,
    },
})
