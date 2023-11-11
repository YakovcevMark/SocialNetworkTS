import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import styled from "styled-components";
// import {store, StoreT} from "./redux/State";
import {Provider} from "react-redux";
import {store} from "./redux/reduxStore";
import Preloader from "./components/common/Preloader/Preloader";
import UsersContainer from "./components/Users/UsersContainer";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <StyledApp>
                    <Header/>
                    <Navbar/>
                    <div className="content">
                        <Routes>
                            <Route path={"/profile"} element={<ProfileContainer/>}/>
                            <Route path={"/dialogs"} >
                                <Route path={""} element={<DialogsContainer/>}/>
                                <Route path={":userId"} element={<DialogsContainer/>} />
                            </Route>
                            <Route path={"/users"} element={<UsersContainer/>}/>
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
