import React, {ComponentType} from 'react';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../../redux/hooks";

// type MapStateToPropsT = { isAuth: boolean }
// const mapStateToProps = (state: RootState): MapStateToPropsT => ({
//     isAuth: state.auth.isAuth
// })

export function withAuthRedirect<WCP>(WrappedComponent:ComponentType<WCP>) {
    return (props: WCP) => {
        const isAuth = useAppSelector(state => state.auth.isAuth)
        if (!isAuth) return <Navigate to={"/login"}/>
        return <WrappedComponent {...props as WCP & ComponentType}/>
    }
}
// export function withAuthRedirect<WCP>(Component:ComponentType<WCP>) {
//     return (props: MapStateToPropsT) => {
//         const isAuth = useAppSelector(state => state.auth.isAuth)
//         if (!isAuth) return <Navigate to={"/login"}/>
//         return connect(mapStateToProps)(<Component {...props as WCP}/>)
//     }
// }
