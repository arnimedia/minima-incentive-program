import React, { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import AppRoutes from '../routes/app.routes'
import { useDispatch, useSelector } from 'react-redux'
import { loggedInTest, selectLoggedIn } from '../account/account.slice.js'
import Spinner from './spinner/Spinner'
import ReactGA from "react-ga4";

ReactGA.initialize("G-DDSV5HNX4J");
ReactGA.send("pageview");

function App() {
    const dispatch = useDispatch()
    const loggedIn = useSelector(selectLoggedIn)

    const [count, setCount] = useState(false);

    useEffect(() => {
      setCount(JSON.parse(window.localStorage.getItem('count')));
    }, []);
  
    useEffect(() => {
      window.localStorage.setItem('count', loggedIn);
      console.log("Count" + loggedIn)
    }, [loggedIn]);


    // Login check with back end
    useEffect(() => {
        dispatch(loggedInTest(`/api/test`))
        console.log("Check Login" + count)
    }, [dispatch])

    const routes = useRoutes(AppRoutes)

    return (
        <>
            <div className='mn-wrap'>{routes}</div>
            <Spinner></Spinner>
        </>
    )
}

export { App }
