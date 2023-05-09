import {React , useEffect, useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from './../account/account.slice'
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function MainLayout() {
    // similar but opposite check to one done in AccountLayout
    // will stop the user entering any of the main pages if they are not logged in

    const loggedIn = useSelector(selectLoggedIn)

    // const [isOpen, setOpen] = useState(
    //   JSON.parse(localStorage.getItem('is-open'))
    // );

    // useEffect(() => {
    //   localStorage.setItem('is-open', JSON.stringify(isOpen));
    // }, [loggedIn]);
  
    if (loggedIn) {
        console.log("Main In " + loggedIn)
        return (
            <>
            <Header />
            <div className="mn-content container-fluid">
                <div className="card">
                    <Outlet />
                </div>
            </div>
            <Footer />
            </>
        )
    } else {
      console.log("Main Out" + loggedIn)
        return <Navigate to="/account/login" replace="true" />
    }
}

export default MainLayout
