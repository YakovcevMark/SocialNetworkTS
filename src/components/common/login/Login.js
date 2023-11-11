import {Navigate} from "react-router-dom";
import {login} from "../../../redux/auth_reducer";
import React from "react";
import {compose} from "redux";
import withRouter from "../../Hocs/WithRouterComponent/WithRouterFunction";
import {connect} from "react-redux";
import LoginForm from "../FormControls/LoginForm";
import {getCaptchaURL, getIsAuth} from "../../../redux/auth_selectors";

const Login = ({isAuth, login, captchaURL}) => {
    if (isAuth) return <Navigate to={"/profile"}/>
    return <>
        <h1>LOGIN</h1>
        <LoginForm onSubmit={login}
                   captchaURL={captchaURL}
                   />
    </>
}
const mapStateToProps = state => {
    return {
        isAuth: getIsAuth(state),
        captchaURL: getCaptchaURL(state),
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps,
        {login})
)(Login);