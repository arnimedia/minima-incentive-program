import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import * as Yup from 'yup'
import { login } from './account.slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedIn, setMessage } from './account.slice'
import PasswordShowHide from "./components/PasswordShowHide";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().email('Email is invalid').required('You must enter your email'),
        password: Yup.string().required('You must enter your password'),
    })

    function onSubmit({ email, password }) {
        dispatch(login({ email, password }))
    }

    function onRegisterClicked() {
        navigate('/account/register')
    }

    function onForgotPasswordClicked() {
        navigate('/account/forgot-password')
    }

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <h3 className="card-header">Log in</h3>
                        <div className="card-body">
                            <p>
                            If you are new to the Incentive Program, please navigate to the<br /> registration page by using the Register button below.
                            </p>
                            <div className="form-group">
                                {/* <label>Email</label> */}
                                <Field
                                    name="email"
                                    type="text"
                                    placeholder="Enter email*"
                                    className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group right-inner-addon">
                                {/* <label>Password</label> */}
                                <Field
                                    name="password"
                                    type="password"
                                    value="Enter password*"
                                    className={
                                        'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                                    }
                                    component={PasswordShowHide}
                                />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mt-4 mb-4">
                                        Log in
                                    </button>
                                    <button onClick={onRegisterClicked} className="btn btn-outline-primary">
                                        Register
                                    </button>
                                </div>
                                <div className="form-group">
                                    <button
                                        onClick={onForgotPasswordClicked}
                                        className="btn btn-link"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export { Login }
