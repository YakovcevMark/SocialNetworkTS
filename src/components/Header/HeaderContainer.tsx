import React, {memo, useEffect} from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {getAuthUserData, logoutRequest} from "../../redux/authReducer";
import {RootState} from "../../redux/reduxStore";

const HeaderContainer: React.FC<HeaderContainerPT> =
    ({
         isAuth,
         login,
         getAuthUserData,
         logoutRequest
     }) => {
        useEffect(() => {
            getAuthUserData()
        }, [getAuthUserData])
        return (
            <Header isAuth={isAuth} login={login} logoutRequest={logoutRequest}/>
        );
    };
type HeaderContainerPT = HeaderContainerT & {}
type HeaderContainerT = MapStateToPropsT & MapDispatchToPropsT
type MapStateToPropsT = {
    isAuth: boolean
    login: string
}
type MapDispatchToPropsT = {
    getAuthUserData: () => void
    logoutRequest:() => void
}
const mapStateToProps = (state: RootState): MapStateToPropsT => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})
export default memo(connect(mapStateToProps, {getAuthUserData,logoutRequest})(HeaderContainer));