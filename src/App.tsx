import React, {createContext, useContext} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import styled from "styled-components";
import {store, StoreT} from "./redux/State";

const MyContext = createContext<StoreT | null>(null)
export const useStoreContext = () => useContext(MyContext)
const App: React.FC = () => {
    return (
        <MyContext.Provider value={store}>
            <BrowserRouter>
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
                        </Routes>
                    </div>
                </StyledApp>
            </BrowserRouter>
        </MyContext.Provider>
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
