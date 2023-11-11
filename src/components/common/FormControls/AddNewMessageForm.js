import {Field, Form, Formik} from "formik";
import React from "react";
import classes from "./FormControls.module.css";
function validateMessage(value){
    let error;
    if(value.length > 100) error = "Max length is 100 symbols";
    return error;

}
export const AddNewMessageForm = ({onSubmit}) => {
    return (
        <Formik
            initialValues={{newMessageBody: ''}}
            onSubmit={(values,
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
                <Form>
                    <div className={classes.formControl + " "
                        + (touched.newMessageBody && errors.newMessageBody ?
                            classes.error : "")}>
                        <Field
                            name="newMessageBody"
                            component="textarea"
                            placeholder="Write new message.."
                            value={values.newMessageBody}
                            validate={validateMessage}
                        />
                        <div>
                            {touched.newMessageBody && errors.newMessageBody &&
                                <span>{errors.newMessageBody}</span>}
                        </div>
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}