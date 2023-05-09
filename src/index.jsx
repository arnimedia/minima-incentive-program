import React from 'react'
import { render } from 'react-dom'
import "./assets/scss/minima.scss"
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App.jsx'
import store from './app/store'
import { Provider } from 'react-redux'

startApp()

function startApp() {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
        document.getElementById('app')
    )
}
