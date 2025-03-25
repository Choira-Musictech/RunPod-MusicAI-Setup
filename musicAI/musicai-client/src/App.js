
import { Switch, Route, Redirect } from "react-router-dom";

import MainScreen from "./pages/MainScreen";
import Main from "./components/layout/Main";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import HomePage from "./pages/HomePage";




function App() {

  return (
    <div className="App">
      <Switch>
        {/* {currentUser?.user.role==="Admin" && <Route  path="/admin/sample-feed" component={AdminSampleFeed} />} */}
        {/* <Route exact path="/home" component={Homepage} />
        <Route exact path="/main" component={MainPage} /> */}
          <Route exact path="/home" component={HomePage} />
        <Main>
          <Route exact path="/dashboard" component={MainScreen} />
          <Redirect from="/*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
