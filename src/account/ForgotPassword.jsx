import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { setMessage, passwordResetEmail } from './account.slice'

function ForgotPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        email: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().email('Email address is invalid').required('You must enter your email'),
    })

    function onSubmit({ email }) {
        dispatch(passwordResetEmail(email))
    }

    function onCancelClicked() {
        navigate('/account/login')
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched }) => (
                <Form>
                    <h3 className="card-header">Forgot Password</h3>
                    <div className="card-body">
                        <p>
                        Please check your junk mail if an email does not arrive in your inbox.
                        </p>
                        <p>
                        To avoid emails from Minima landing in spam, save community@minima.global as a contact in your email client.
                        </p>
                        <div className="form-group">
                            <Field
                                name="email"
                                type="text"
                                placeholder="Enter email*"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mt-4 mb-4">
                                    Submit
                                </button>
                                <button onClick={onCancelClicked} className="btn btn-outline-primary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { ForgotPassword }
