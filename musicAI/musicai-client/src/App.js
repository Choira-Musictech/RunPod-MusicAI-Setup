
import React, {useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import MainScreen from "./pages/MainScreen";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminSignIn from "./pages/AdminSignIn";
import AdminSignUp from "./pages/AdminSignup";
import Main from "./components/layout/Main";
import AdminMain from "./components/layout/AdminMain";
import MainPage from "./pages/MainPage";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
// import "./assets/styles/responsive.css";
import Homepage from "./pages/Homepage";

import { logout } from "./redux/auth";

import EventBus from "./utils/EventBus";
import AdminSampleFeed from './pages/AdminSampleFeed';


function App() {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  
  
  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  console.log("currentUser", currentUser);

  return (
    <div className="App">
      <Switch>
        <Route path="/register" exact component={SignUp} />
        <Route path="/sign-in" exact component={AdminSignIn} />
        <Route path="/sign-up" exact component={AdminSignUp} />
        {currentUser?.user.role==="Admin" && <Route  path="/admin/sample-feed" component={AdminSampleFeed} />}
        {/* <Route exact path="/home" component={Homepage} />
        <Route exact path="/main" component={MainPage} /> */}
        <Main>
          <Route exact path="/dashboard" component={MainScreen} />
          <Redirect from="/*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
