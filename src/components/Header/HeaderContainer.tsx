import React, {memo, useEffect} from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {getAuthUserData} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

const HeaderContainer: React.FC<HeaderContainerPT> =
    ({
         isAuth,
         login,
         getAuthUserData
     }) => {
        useEffect(() => {
            getAuthUserData()
        }, [getAuthUserData])
        return (
            <Header isAuth={isAuth} login={login}/>
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
}
const mapStateToProps = (state: AppStateType): MapStateToPropsT => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})
export default memo(connect(mapStateToProps, {getAuthUserData})(HeaderContainer));