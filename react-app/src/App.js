import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";

import ServerDisplay from "./components/ServerDisplay/ServerDisplay";
import UserHomePage from "./components/UserHome/UserHomePage";

import ProtectedRoute from "./components/Forms/auth/ProtectedRoute";

import { authenticate } from "./store/session";

import SplashPage from "./components/SplashPage/SplashPage";
import ErrorPage from "./components/404/404";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate()).then(() => {
        setIsLoaded(true);
      });
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    isLoaded && (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true}>
            <SplashPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage></LoginPage>
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpPage />
          </Route>

          <ProtectedRoute path="/me">
            <UserHomePage></UserHomePage>
          </ProtectedRoute>

          <ProtectedRoute path="/me/:inbox_uuid">
            <UserHomePage></UserHomePage>
          </ProtectedRoute>

          <ProtectedRoute path="/servers/:serverUuid">
            <ServerDisplay></ServerDisplay>
          </ProtectedRoute>

          <ProtectedRoute path="/servers/:serverUuid/:channelUuid">
            <ServerDisplay></ServerDisplay>
          </ProtectedRoute>

          <Route path="/">
            <ErrorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
