import { createSlice, createSelector } from '@reduxjs/toolkit'
import { fetchWrapper } from '../_helpers'
import { accountService } from '../_services'
import { startSpinner, stopSpinner } from '../app/spinner/spinner.slice'

// check if the user is logged in
export const loggedInTest = (url) => (dispatch, getState) => {
    dispatch(startSpinner())
    fetchWrapper.getWithoutRedirect(url).then(
        (res) => {
            dispatch(setLoggedIn(res.ok))
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            dispatch(setLoggedIn(false))
            dispatch(stopSpinner())
        }
    )
}

export const login = (credentials) => (dispatch, getState) => {
    dispatch(startSpinner())
    dispatch(setMessage(''))
    accountService.login(credentials.email, credentials.password).then(
        () => {
            dispatch(setLoggedIn(true))
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            let message = 'Login failed'
            if (status === 450) {
                message = "Registered but not verified. Please reset your password with the 'Forgot Password' link"
            }
            dispatch(setLoggedIn(true))
            // dispatch(setLoggedIn(false))
            dispatch(setMessage(message))
            dispatch(stopSpinner())
        }
    )
}

export const logout = () => (dispatch, getState) => {
    dispatch(startSpinner())
    dispatch(setMessage(''))
    accountService.logout().then(
        () => {
            dispatch(setLoggedIn(false))
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            // If logout returns a failed response, there is inconsistent login state between back and fron end
            // so we force the user to login again
            dispatch(setLoggedIn(false))
            dispatch(stopSpinner())
        }
    )
}

export const register = (credentials) => (dispatch, getState) => {
    dispatch(startSpinner())
    dispatch(setMessage(''))
    accountService.registration(credentials).then(
        () => {
            dispatch(
                setMessage("Registration successful. Please check your email. Don't forget to check your spam folder")
            )
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            let message = 'Registration failed'
            if (status === 409) {
                message =
                    "You have already registered with this email. Please click 'Cancel' and reset your password with the 'Forgot Password' link"
            }
            if (status === 410) {
                message = 'You have already registered with this Phone Number'
            }

            if (status === 411) {
                message = 'Invite Code not valid'
            }

            if (status === 413) {
                message = 'Registration failed. Double check your Phone Number or re-send the Verification Code'
            }
            dispatch(setMessage(message))
            dispatch(stopSpinner())
        }
    )
}

export const passwordResetEmail = (email) => (dispatch, getState) => {
    dispatch(startSpinner())
    dispatch(setMessage(''))
    accountService.passwordResetToken(email).then(
        () => {
            dispatch(
                setMessage(
                    "Please check your email for password reset instructions. Don't forget to check your spam folder"
                )
            )
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            dispatch(setMessage('Password Reset failed'))
            dispatch(stopSpinner())
        }
    )
}

export const registrationVerifyEmail = (token) => (dispatch, getState) => {
    dispatch(startSpinner())
    dispatch(setMessage(''))
    accountService.registratonComplete(token).then(
        () => {
            dispatch(setMessage('Verification successful, you can now login'))
            dispatch(setRegistrationComplete(true))
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            // dispatch(setMessage('Verify email failed'))
            dispatch(stopSpinner())
        }
    )
}

// validate the password reset token
export const passwordResetValidate = (token) => (dispatch, getState) => {
    dispatch(startSpinner())
    dispatch(setMessage(''))
    accountService.passwordResetValidateToken(token).then(
        () => {
            // dispatch(setMessage('Valid password reset token'))
            dispatch(setPasswordResetTokenValid(true))
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            // dispatch(setMessage('Invalid password reset token'))
            dispatch(stopSpinner())
        }
    )
}

// set new password
export const passwordReset =
    ({ resetToken, password, confirmPassword }) =>
    (dispatch, getState) => {
        dispatch(startSpinner())
        dispatch(setMessage(''))
        accountService.passwordReset({ resetToken, password, confirmPassword }).then(
            () => {
                dispatch(setMessage('Password reset'))
                dispatch(setPasswordResetComplete(true))
                dispatch(stopSpinner())
            },
            ({ error, status }) => {
                dispatch(setMessage('Password reset failure'))
                dispatch(stopSpinner())
            }
        )
    }

export const verifyNumber = (phoneNumber) => (dispatch, getState) => {
    dispatch(startSpinner())
    dispatch(setMessage(''))

    accountService.verifyPhoneNumber(phoneNumber).then(
        () => {
            dispatch(setMessage('Verification Code sent to ' + phoneNumber))
            dispatch(stopSpinner())
        },
        ({ error, status }) => {
            let message = 'Could not send Verification Code to ' + phoneNumber
            if (status === 429) {
                message = 'Verification is busy, please try again in 10 minutes'
            }

            dispatch(setMessage(message))
            dispatch(setPhone(phoneNumber))
            dispatch(stopSpinner())
        }
    )
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        loggedIn: false,
        registrationComplete: false,
        passwordResetTokenValid: false,
        passwordResetComplete: false,
        message: '',
        phone: '',
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setRegistrationComplete: (state, action) => {
            state.registrationComplete = action.payload
        },
        setPasswordResetTokenValid: (state, action) => {
            state.passwordResetTokenValid = action.payload
        },
        setPasswordResetComplete: (state, action) => {
            state.passwordResetComplete = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setMessage,
    setPhone,
    setLoggedIn,
    setRegistrationComplete,
    setPasswordResetTokenValid,
    setPasswordResetComplete,
} = accountSlice.actions

export default accountSlice.reducer

///// selectors

const selectAccount = (state) => state.account
export const selectLoggedIn = createSelector(selectAccount, (state) => state.loggedIn)
export const selectMessage = createSelector(selectAccount, (state) => state.message)
export const selectPhone = createSelector(selectAccount, (state) => state.phone)
export const selectRegistrationComplete = createSelector(selectAccount, (state) => state.registrationComplete)
export const selectPasswordResetTokenValid = createSelector(selectAccount, (state) => state.passwordResetTokenValid)
export const selectPasswordResetComplete = createSelector(selectAccount, (state) => state.passwordResetComplete)
