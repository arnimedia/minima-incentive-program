import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AccountHeader from "./layout/AccountHeader";
import AccountFooter from "./layout/AccountFooter";
import AccountMessage from './AccountMessage'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedIn, setMessage } from './account.slice'


function AccountLayout() {
    const dispatch = useDispatch()

    // similar but opposite check to one done in MainLayout
    // will stop the user entering any of the account pages if they are logged in
    const loggedIn = useSelector(selectLoggedIn)
    if (loggedIn) {
        dispatch(setMessage(''))
        console.log("Account In " + loggedIn)
        return <Navigate to="/" replace="true" />
    } else {
        console.log("Account Out " + loggedIn)
        return accountPages()
    }
}

function accountPages() {
    return (
        <>
            <AccountHeader />
            <div className="mn-content container-fluid">
                <div className="card">
                    <AccountMessage></AccountMessage>
                    <Outlet></Outlet>
                </div>
            </div>
            <AccountFooter />
        </>
    )
}

export default AccountLayout
