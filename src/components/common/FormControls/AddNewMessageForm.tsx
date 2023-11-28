import {Field, Form, Formik, FormikValues} from "formik";
import React from "react";
import s from "./FormControls.module.scss";

type AddNewMessageFormT = {
    onSubmit: (newMessageBody: string) => void
}

// function validateMessage(value: string) {
//     let error;
//     if (value.length > 100) error = "Max length is 100 symbols";
//     return error;
//
// }

export const AddNewMessageForm: React.FC<AddNewMessageFormT> = ({onSubmit}) => {
    return (
        <Formik
            initialValues={{newMessageBody: ''}}
            onSubmit={(values: FormikValues,
                       {setSubmitting}) => {
                onSubmit(values.newMessageBody)
                values.newMessageBody = '';
            }
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
                <Form className={s.newMessage}>

                        <div className={s.formControl + " "
                            + (touched.newMessageBody && errors.newMessageBody ?
                                s.error : "")}>
                            <div>
                                {touched.newMessageBody && errors.newMessageBody &&
                                    <span>{errors.newMessageBody.toString()}</span>}
                            </div>
                            <Field
                                name="newMessageBody"
                                component="textarea"
                                placeholder="Write new message.."
                                value={values.newMessageBody}
                                // validate={validateMessage}
                            />

                        </div>
                        <button type="submit">
                            Submit
                        </button>
                </Form>
            )}
        </Formik>
    )
}
