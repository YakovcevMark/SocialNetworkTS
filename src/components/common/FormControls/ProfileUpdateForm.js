import userLocalPhoto from "../../../assets/img/user.png";
import {Field, Form, Formik} from "formik";
import classes from "../../Profile/ProfileInfo/ProfileInfo.module.css";
import ProfileStatus from "../../Profile/ProfileInfo/ProfileStatus";
import React from "react";
import Contact from "../../Profile/ProfileInfo/Contact";

const ProfileUpdateForm = ({
                               savePhoto,
                               profileInfo,
                               status,
                               updateProfileStatusRequest,
                               onSubmit
                           }) => {
    function onSavePhoto(e) {
        if (e.currentTarget.files[0])
            savePhoto(e.currentTarget.files[0]);
    }

    const profilePhoto = profileInfo.photos.large || userLocalPhoto;
    return (
        <Formik
            initialValues={{...profileInfo}}
            onSubmit={(values,
                       {setSubmitting, setErrors}) => {
                // onSubmit(values.newMessageBody)
                onSubmit(values, setErrors);
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
                    <button type="submit">
                        Save
                    </button>
                    <div>
                        {errors.apiError &&
                            <span>{errors.apiError}</span>}
                    </div>
                    <div className={classes.profilePhoto}>
                        <img src={profilePhoto} alt=""/>
                    </div>
                    <div>
                        <input type="file" onChange={onSavePhoto}/>
                    </div>
                    <div>
                        <div></div>
                        <b>FullName:</b>

                        <Field
                            name="fullName"
                            component="input"
                            placeholder="Enter ur full name"
                            value={values.fullName}
                            // validate={validateMessage}
                        />
                    </div>
                    <div>
                        <b>Status:</b> Note: double click for change status
                        <ProfileStatus
                            isOwner={true}
                            status={status}
                            updateProfileStatusRequest={updateProfileStatusRequest}
                        />
                    </div>
                    <div>
                        <div><b>aboutMe:</b></div>
                        <Field
                            name="aboutMe"
                            component="textarea"
                            placeholder="Write something about you"
                            value={values.aboutMe}
                        />
                    </div>
                    <div>
                        <div><b>Ищет работу?</b></div>
                        <Field
                            name="lookingForAJob"
                            component="input"
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <div><b>lookingForAJobDescription</b></div>
                        <Field
                            name="lookingForAJobDescription"
                            component="textarea"
                            placeholder="Please, can you tell something about your last job?"
                            value={values.lookingForAJobDescription}
                        />
                    </div>
                    <div>
                        <b>Contacts:</b>
                        {Object.keys(profileInfo.contacts).map(key => {
                            return <><Contact key={key}
                                              contactName={key}
                                              contactValue={profileInfo.contacts[key]}
                            />
                                <Field
                                    name={key}
                                    component="input"
                                    placeholder={`Write your ${key}`}
                                    value={values.contacts.key}
                                />
                            </>

                        })}
                    </div>
                    {/*<div className={classes.formControl + " "*/}
                    {/*    + (touched.newMessageBody && errors.newMessageBody ?*/}
                    {/*        classes.error : "")}>*/}
                    {/*    <Field*/}
                    {/*        name="newMessageBody"*/}
                    {/*        component="textarea"*/}
                    {/*        placeholder="Write new message.."*/}
                    {/*        value={values.newMessageBody}*/}
                    {/*        // validate={validateMessage}*/}
                    {/*    />*/}
                    {/*    <div>*/}
                    {/*        {touched.newMessageBody && errors.newMessageBody &&*/}
                    {/*            <span>{errors.newMessageBody}</span>}*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </Form>
            )}
        </Formik>
    )
}
export default ProfileUpdateForm;