import {Field, Form, Formik} from "formik";
import s from "./FormControls.module.scss"
import React from "react";
type AddNewPostFormT= {
    onSubmit: (newPostBody: string) => void
}
function validatePostText(value:string){
    let error;
    if(value.length > 30) error = "Max length is 30 symbols";
    return error;

}
export const AddNewPostForm:React.FC<AddNewPostFormT> = ({onSubmit}) => {
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
                <Form className={s.newPost}>
                    <div className={s.formControl + " "
                        + (touched.newPostBody && errors.newPostBody ?
                            s.error : "")}>
                        <Field
                            name="newPostBody"
                            component="textarea"
                            placeholder="Enter net post text..."
                            value={values.newPostBody}
                            validate={validatePostText}
                        />

                        <div>
                            {touched.newPostBody && errors.newPostBody &&
                                <span>{errors.newPostBody.toString()}</span>}
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