import {Field, Form, Formik} from "formik";
import classes from "./FormControls.module.css"
import React from "react";
function validatePostText(value){
    let error;
    if(value.length > 30) error = "Max length is 30 symbols";
    return error;

}
export const AddNewPostForm = ({onSubmit}) => {
    return (
        <Formik
            initialValues={{newPostBody: ""}}
            onSubmit={(values,
                       {setSubmitting}) => {
                onSubmit(values.newPostBody)
                values.newPostBody = '';
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
                        + (touched.newPostBody && errors.newPostBody ?
                            classes.error : "")}>
                        <Field
                            name="newPostBody"
                            component="textarea"
                            placeholder="Enter net post text..."
                            value={values.newPostBody}
                            validate={validatePostText}
                        />

                        <div>
                            {touched.newPostBody && errors.newPostBody &&
                                <span>{errors.newPostBody}</span>}
                        </div>
                    </div>
                    <button type="submit">
                        Add post
                    </button>
                </Form>
            )}
        </Formik>
    )
}