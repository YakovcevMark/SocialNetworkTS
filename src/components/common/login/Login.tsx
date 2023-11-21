// import {login} from "../../../redux/authReducer";
import React from "react";
import {compose} from "redux";
// import withRouter from "../../Hocs/WithRouterComponent/WithRouterFunction";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {Navigate} from "react-router-dom";

const Login: React.FC<MapDispatchToPropsT> =
    ({
         isAuth,
         // login,
         // captchaURL
     }) => {
        if (isAuth) return <Navigate to={"/profile"}/>
        return <>
            <h1>LOGIN</h1>
            {/*<LoginForm onSubmit={login}*/}
            {/*           captchaURL={captchaURL}*/}
            {/*           />*/}
        </>
    }
type MapDispatchToPropsT = {
    isAuth: boolean
    captchaURL: string
}
const mapStateToProps = (state: AppStateType): MapDispatchToPropsT => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL,
    }
}
export default compose(
    connect(mapStateToProps,
        // {login}
    )
)(Login);