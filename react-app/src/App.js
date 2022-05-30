import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
// import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/Forms/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

import SplashPage from "./components/SplashPage/SplashPage";
import CreateServer from "./components/s3_test";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage />
          {/* <NavBar /> */}
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage></LoginPage>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpPage />
        </Route>
        <Route path="/test" exact={true}>
          <CreateServer />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
