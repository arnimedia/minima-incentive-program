import { fetchWrapper } from './../_helpers'

export const accountService = {
    login,
    logout,
    verifyPhoneNumber,
    registration,
    registratonComplete,
    passwordResetToken,
    passwordResetValidateToken,
    passwordReset,
}

function login(email, password) {
    return fetchWrapper.postForm(`/api/login`, { username: email, password })
}

function logout() {
    return fetchWrapper.post(`/api/logout`, {})
}

// registration

function verifyPhoneNumber(phoneNumber) {
    // back end will use the same service to make sure verification code is correct
    const PHONE_VERIFY_ENDPOINT = 'https://verify-9776-kiovbv.twil.io/start-verify'
    const data = new URLSearchParams()
    data.append('to', phoneNumber)
    return fetchWrapper.postPhone(PHONE_VERIFY_ENDPOINT, data)
}

function registration(params) {
    return fetchWrapper.post(`/api/user/registration`, params)
}

function registratonComplete(token) {
    return fetchWrapper.post(`/api/user/registration/${token}`)
}

// password reset

function passwordResetToken(email) {
    return fetchWrapper.post(`/api/user/password-reset/token`, { email })
}

function passwordResetValidateToken(token) {
    return fetchWrapper.get(`/api/user/password-reset/${token}`, { token })
}

function passwordReset({ resetToken, password }) {
    return fetchWrapper.post(`/api/user/password-reset/${resetToken}`, { password })
}
