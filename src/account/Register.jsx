import React, { Fragment } from 'react'
import { createRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'
import { register, verifyNumber, selectPhone } from './account.slice'
import { useDispatch, useSelector } from 'react-redux'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css';
import Cookies from 'js-cookie'
// import PasswordShowHide from "./components/PasswordShowHide";

const ReCAPTCHA_KEY = "6LcnZyMeAAAAALZe_O94rv_tKY-qlbtkSqY67cJz";

function Register() {
    const _reCaptchaRef = createRef();
    const verifiedPhone = useSelector(selectPhone)
    const [searchParams, setSearchParams] = useSearchParams();
    const [showHidePassword, changeShowHidePassword] = useState(false);
    const passShowIcon = !showHidePassword ? "icon-on" : "icon-off"

    if (searchParams.get("inviteCode")) {
        Cookies.set('inviteCode', searchParams.get("inviteCode"), { expires: 9 })
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        phonePrefix: '',
        phoneVerifyCode: '',
        inviteCode: Cookies.get('inviteCode') || '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().email('Email is invalid').required('You must enter email'),
        confirmEmail: Yup.string()
        .oneOf([Yup.ref('email'), null], 'Your email does not match')
        .required('Confirm email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('You must enter a password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Your password does not match')
            .required('Confirm password is required'),
        phoneVerifyCode: Yup.string().trim().required('You must enter your verification code'),
        inviteCode: Yup.string().trim().matches(/^\w+$/, 'Invite Code must contain alphabet and digit characters')
            .length(8, 'Invite Code must be 8 characters')
            .uppercase()
            .nullable()
            .optional(),
    })

    // generate a prefix
    // with leading 0s removed
    // and a + sign at the beginning
    const generatePrefix = (prefixString) => {
        const integerPrefix = parseInt(prefixString, 10)
        const prefix = integerPrefix.toString()
        return `+${prefix}`
    }

    const onVerifyClicked = (fields) => () => {
        const cleaned = generatePrefix(fields.phonePrefix)
        const fullNumber = `${cleaned}${fields.phoneNumber}`
        dispatch(verifyNumber(fullNumber))
    }

    function onSubmit(fields) {
        // back end removes 0s and adds '+' so we can leave prefix as is
        dispatch(register(fields))
    }

    function onCancelClicked() {

        navigate('/account/login')
    }

    const executeReCaptcha = (values, props) => {
        _reCaptchaRef.current.execute();
    };

    const formatPhoneNumberOutput = (
        isValid,
        newNumber,
        countryData,
        fullNumber,
        isExtension,
    ) => {
        if (fullNumber) {
            return newNumber.replace(/(\s|-)/g, '');
        }
        return '';
    }

    const formatPhonePrefixOutput = (selectedCountryData) => {
        if (selectedCountryData) {
            return selectedCountryData.dialCode;
        }
        return '';
    }

    return (
      <>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, values, setFieldValue, setFieldError, validateForm }) => (
                <Form>
                    <h3 className="card-header">Register for the Incentive Program</h3>
                    <div className="card-body">
                        <p>
                        Welcome to Minima—a cooperative network that enables everyone to freely connect and prosper.
                        </p>
                        <p>
                        Our Incentive Program is designed to reward you for helping to build the network by running a Minima node until Mainnet launch. 
                        </p>

                        <p>If you would like to find out more, go to:<br /> <a href="https://www.minima.global/get-involved" target="blank">https://www.minima.global/get-involved</a></p>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Enter phone number</label>
                                    <Field
                                        name="phoneNumber"
                                        render={({ field, form: { errors, isSubmitting, touched, setFieldTouched, setFieldValue } }) => {
                                            return (
                                                <Fragment>
                                                    <IntlTelInput

                                                        defaultCountry={'us'}
                                                        defaultValue={field.value}
                                                        fieldId={"phoneNumber"}
                                                        fieldName={"phoneNumber"}
                                                        onPhoneNumberBlur={(isValid) => {
                                                            setFieldTouched("phoneNumber", true);
                                                        }}
                                                        autoHideDialCode={true}
                                                        separateDialCode={true}
                                                        // nationalMode={true}

                                                        inputClassName={
                                                            'form-control' +
                                                            (values.phoneNumberValid != "true" && touched.phoneNumber ? ' is-invalid' : '')
                                                        }
                                                        onSelectFlag={(...args) => {
                                                            setFieldValue("phonePrefix", formatPhonePrefixOutput(args[1]));
                                                            console.log(args)
                                                            if (args[3]) { //isValid
                                                                setFieldValue("phoneNumberValid", "true");
                                                            } else {
                                                                setFieldValue("phoneNumberValid", "false");

                                                            }
                                                        }}

                                                        onPhoneNumberChange={(...args) => {
                                                            setFieldValue("phoneNumber", formatPhoneNumberOutput(...args));
                                                            setFieldValue("phonePrefix", formatPhonePrefixOutput(args[2]));

                                                            if (args[0]) { //isValid
                                                                setFieldValue("phoneNumberValid", "true");
                                                            } else {
                                                                setFieldValue("phoneNumberValid", "false");
                                                            }
                                                        }}
                                                        preferredCountries={['us', 'ru', 'ua', 'by', 'tr', 'cn']}
                                                    />
                                                </Fragment>
                                            );
                                        }}
                                    />
                                    {values.phoneNumberValid != "true" && touched.phoneNumber ? (<div className='invalid-feedback' style={{ display: 'block' }}>
                                        {"Could not send a verification code to "}{verifiedPhone}{". Please make sure to select your correct country code & remove the initial 0 from the phone number field."}</div>) : null}
                                        
                        </div>
                        <div className="form-group mb-0">
                            <button
                                // onMouseOver={(e) => executeReCaptcha()} 
                                onClick={onVerifyClicked(values)}
                                type="button"
                                className="btn btn-link get-otp"
                            >
                                {'Send verification code'}
                            </button>
                        </div>
                        <div className="form-group warning-msg mt-0">
                                <strong>The Incentive Program has a one node per person policy.</strong> Minima uses your phone number to verify you are only trying to set up one account. 
                        </div>
                        <div className="form-group">
                            <Field
                                name="phoneVerifyCode"
                                type="text"
                                placeholder="Enter verification code*"
                                className={
                                    'form-control' +
                                    (errors.phoneVerifyCode && touched.phoneVerifyCode ? ' is-invalid' : '')
                                }
                            />
                            <ErrorMessage name="phoneVerifyCode" component="div" className="invalid-feedback" />
                        </div>
                       
                        <div className="form-group">
                            <Field
                                name="email"
                                type="text"
                                placeholder="Enter email*"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                onPaste={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                onCopy={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                            />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field
                                name="confirmEmail"
                                type="text"
                                placeholder="Confirm email*"
                                className={'form-control' + (errors.confirmEmail && touched.confirmEmail ? ' is-invalid' : '')}
                                onPaste={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                onCopy={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                            />
                            <ErrorMessage name="confirmEmail" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group right-inner-addon">
                            <i
                              className={errors.password && touched.password ? "" : passShowIcon}
                              onClick={() => changeShowHidePassword(!showHidePassword)}
                            > 
                            </i>
                            <Field
                                name="password"
                                placeholder="Enter password*"
                                type={showHidePassword ? "text" : "password"}
                                className={
                                    'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                                }
                                // component={PasswordShowHide}
                            />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group right-inner-addon">
                            <Field
                                name="confirmPassword"
                                placeholder="Confirm password*"
                                type={showHidePassword ? "text" : "password"}
                                className={
                                    'form-control' +
                                    (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                                }                              
                                // component={PasswordShowHide}
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <Field
                                name="inviteCode"
                                type="text"
                                placeholder="Enter Invite Code (optional)"
                                className={
                                    'form-control' +
                                    (errors.inviteCode && touched.inviteCode ? ' is-invalid' : '')
                                }
                            />
                            <ErrorMessage name="inviteCode" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-row mt-4">
                        <ReCAPTCHA
                            ref={_reCaptchaRef}
                            sitekey={ReCAPTCHA_KEY}
                            onChange={(value) => {
                                setFieldValue("recaptcha", value);
                            }}
                            size="invisible"
                        />
                        <div className="form-group">
                            <button type="submit" onMouseOver={(e) => executeReCaptcha()} className="btn btn-primary" disabled={Object.keys(errors).length > 0 || values.phoneNumberValid !== "true"}>
                                Register
                            </button>
                        </div>
                        <div className="form-group">
                            <button onClick={onCancelClicked} className="btn btn-link">
                                Log in
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

export { Register }
