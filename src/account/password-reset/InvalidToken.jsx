import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setMessage } from './../account.slice'

function InvalidToken() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function onForgotPasswordClicked() {
        navigate('/account/forgot-password')
    }

    return (
        <div>
            Token validation failed, if the token has expired you can get a new one at the{' '}
            <button onClick={onForgotPasswordClicked} className="btn btn-link">
                forgot password
            </button>{' '}
            page.
        </div>
    )
}

export default InvalidToken
