import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { passwordReset, setMessage } from './../account.slice'

function PasswordReset({ resetToken }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        password: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    })

    function onSubmit({ password, confirmPassword }) {
        dispatch(passwordReset({ resetToken, password, confirmPassword }))
    }

    function onCancelClicked() {
        navigate('/account/login')
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched }) => (
                <Form>
                    <div className="form-group">
                        <label>Password</label>
                        <Field
                            name="password"
                            type="password"
                            className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <Field
                            name="confirmPassword"
                            type="password"
                            className={
                                'form-control' +
                                (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                            }
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <button type="submit" className="btn btn-primary">
                                Reset Password
                            </button>
                            <button onClick={onCancelClicked} className="btn btn-link">
                                Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default PasswordReset
