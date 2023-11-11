import {Field, Form, Formik} from "formik";
import React from "react";
import classes from "./FormControls.module.css";


function validateEmail(value) {
    let error;
    if (!value) error = 'Required'
    if (value.length > 50) error = 'Your email should be less 50 symbols'
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)) error = 'Your email is not valid email'
    return error;
}

function validatePassword(value) {
    let error;
    if (!value) error = 'Required'
    if (value.length > 20) error = 'Your password should be less 20 symbols'
    if (value.length < 8) error = 'Your password should be more then 7 symbols'
    return error;
}

const LoginForm = ({onSubmit, captchaURL}) => {
    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false, captcha: null}}
            onSubmit={(values,
                       {setSubmitting, setErrors}) => onSubmit(values, setErrors)
            }
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,

              }) => (
                <Form>
                    <div className={classes.formControl + " "
                        + (touched.email && errors.email ?
                            classes.error : "")}>
                        <Field
                            type="login"
                            name="email"
                            component="input"
                            placeholder="email"
                            value={values.email}
                            validate={validateEmail}
                        />
                        <div>
                            {touched.email && errors.email &&
                                <span>{errors.email}</span>}
                        </div>
                    </div>
                    <div className={classes.formControl + " "
                        + (touched.password && errors.password ?
                            classes.error : "")}>
                        <Field
                            type="password"
                            name="password"
                            component="input"
                            placeholder="password"
                            value={values.password}
                            validate={validatePassword}
                        />
                        <div>
                            {touched.password && errors.password &&
                                <span>{errors.password}</span>}
                        </div>
                    </div>
                    <div>
                        <Field
                            type="checkbox"
                            name="rememberMe"
                            component="input"
                        />
                        remember me?
                    </div>
                    <div className={classes.apiErrors + " " + classes.formControl}>
                        {errors.apiError &&
                            <span>{errors.apiError}</span>}
                    </div>
                    <div>
                        {captchaURL && <img src={captchaURL} alt=""/>}
                        {captchaURL && <div>
                            <Field
                                type="captcha"
                                name="captcha"
                                component="input"
                                placeholder="Enter the captcha"
                                value={values.captcha}
                            />
                        </div>}

                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}
export default LoginForm;
