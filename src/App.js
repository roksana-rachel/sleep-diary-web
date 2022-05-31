import SignUp from "./components/SignUp";
import {AuthProvider} from "./contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import SleepDiary from "./components/SleepDiary";
import DoctorDashboard from "./components/DoctorDashboard";
import AddPatient from "./components/AddPatient";
import React, {useState} from "react";

function App() {

  return (
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={DoctorDashboard}/>
              <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>
              <PrivateRoute path="/db" component={SleepDiary} />
              <PrivateRoute path="/add" component={AddPatient} />
              <Route path="/signup" component={SignUp}/>
              <Route path="/signin" component={SignIn}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
