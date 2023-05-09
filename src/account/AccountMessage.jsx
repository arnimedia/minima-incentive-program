import React from 'react'
import { useSelector } from 'react-redux'
import { selectMessage, selectPhone} from './account.slice'

function AccountMessage() {
    const message = useSelector(selectMessage)
    const phone = useSelector(selectPhone)
    console.log(message + " " + phone);

    return message ? (
        <div className="alert alert-info" style={{ textAlign: 'center' }} role="alert">
            {message}
        </div>
    ) : (
        <div />
    )
}

export default AccountMessage
