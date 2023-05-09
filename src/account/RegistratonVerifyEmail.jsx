import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import { registrationVerifyEmail, selectRegistrationComplete, setMessage } from './account.slice'

function RegistratonVerifyEmail() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let [searchParams, setSearchParams] = useSearchParams()

    const registrationComplete = useSelector(selectRegistrationComplete)

    let token = searchParams.get('token')

    useEffect(() => {
        dispatch(registrationVerifyEmail(token))
    }, [dispatch, token])

    function onForgotPasswordClicked() {
        navigate('/account/forgot-password')
    }

    if (registrationComplete) {
        return <Navigate to="/account/login" />
    } else {
        return (
            <div>
                <h3 className="card-header">Verify Email</h3>
                <div className="card-body">
                    <div>
                        Verification failed, you can also verify your account using the{' '}
                        <button onClick={onForgotPasswordClicked} className="btn btn-link">
                            forgot password
                        </button>{' '}
                        page.
                    </div>
                </div>
            </div>
        )
    }
}

export { RegistratonVerifyEmail }
