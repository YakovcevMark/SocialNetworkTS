import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import styled from "styled-components";
import {Provider} from "react-redux";
import {store} from "./redux/reduxStore";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/common/login/Login";
import Users from "./components/Users/Users";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <StyledApp>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="content">
                        <Routes>
                            <Route path={"/profile"}>
                                <Route path={""} element={<ProfileContainer/>}/>
                                <Route path={":userId"} element={<ProfileContainer/>} />
                            </Route>
                            <Route path={"/dialogs"} >
                                <Route path={""} element={<DialogsContainer/>}/>
                                <Route path={":userId"} element={<DialogsContainer/>} />
                            </Route>
                            <Route path={"/users"} element={<Users/>}/>
                            <Route path={"/login"} element={<Login/>}/>
                        </Routes>
                    </div>
                </StyledApp>
            </HashRouter>
        </Provider>
    );
}
const StyledApp = styled.div`
  margin: 0 auto;
  padding: 0 20px 0 20px;
  display: grid;
  width: 80%;
  grid-template-areas: "h h"
                       "n c";

  grid-template-columns: 2fr 10fr;
  grid-gap: 2px;

  .content {
    grid-area: c;
    background-color: rgba(115, 96, 70, 0.62);
  }
`
export default App;
