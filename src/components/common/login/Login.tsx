import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reduxStore";
import {Navigate} from "react-router-dom";
import LoginForm from "../FormControls/LoginForm";
import {loginRequest} from "../../../redux/authReducer";
import {FormikValues} from "formik";

const Login: React.FC<MapStateToPropsT & MDTPT> =
    ({
         isAuth,
         loginRequest,
         captchaURL
     }) => {
        if (isAuth) return <Navigate to={"/profile"}/>
        return <>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={loginRequest}
                       captchaURL={captchaURL}
            />
        </>
    }
type MapStateToPropsT = {
    isAuth: boolean
    captchaURL: string
}
type MDTPT = {
    loginRequest: (data: FormikValues, setStatus: (status:string) => void) => void
}
const mapStateToProps = (state: RootState): MapStateToPropsT => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL,
    }
}

export default compose(
    connect(mapStateToProps,
        {loginRequest}
    )
)(Login);