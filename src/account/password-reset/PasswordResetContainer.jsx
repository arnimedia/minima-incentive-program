import React, { useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { passwordResetValidate, selectPasswordResetTokenValid, selectPasswordResetComplete } from './../account.slice'
import PasswordReset from './PasswordReset'
import InvalidToken from './InvalidToken'

function PasswordResetContainer() {
    const dispatch = useDispatch()

    let [searchParams, setSearchParams] = useSearchParams()

    const validToken = useSelector(selectPasswordResetTokenValid)
    const passwordResetComplete = useSelector(selectPasswordResetComplete)

    let token = searchParams.get('token')

    useEffect(() => {
        dispatch(passwordResetValidate(token))
    }, [dispatch, token])

    if (passwordResetComplete) {
        return <Navigate to="/account/login" />
    } else {
        return (
            <div>
                <h3 className="card-header">Reset Password</h3>
                <div className="card-body">
                    {validToken ? <PasswordReset resetToken={token}></PasswordReset> : <InvalidToken></InvalidToken>}
                </div>
            </div>
        )
    }
}

export default PasswordResetContainer
