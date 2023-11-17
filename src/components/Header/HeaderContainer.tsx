import React, {memo, useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Header from "./Header";
import {AuthUserDataT, setAuthUserData} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";
import axios from "axios";
import Preloader from "../common/Preloader/Preloader";
import {authAPI} from "../../api/samuraiAPI";

const HeaderContainer: React.FC<HeaderContainerPT> =
    ({
         isAuth,
         login,
         setAuthUserData
     }) => {
        useEffect(() => {
            authAPI.authorization()
                .then(resp => {
                    if (resp.data.resultCode === 0) {
                        setAuthUserData(resp.data.data)
                    }
                })
        }, [setAuthUserData])
        return (
            isAuth ? <Header login={login}/> : <Preloader/>
        );
    };
type HeaderContainerPT = HeaderContainerT & {}
type HeaderContainerT = MapStateToPropsT & MapDispatchToPropsT
type MapStateToPropsT = {
    isAuth: boolean
    login: string
}
type MapDispatchToPropsT = {
    setAuthUserData: (data: AuthUserDataT) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsT => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})
export default memo(connect(mapStateToProps, {setAuthUserData})(HeaderContainer));