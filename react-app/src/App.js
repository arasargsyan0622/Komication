import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import NewServerForm from "./components/Forms/NewServer";
import ServerInvite from "./components/Forms/ServerInvite";
import ServerEdit from "./components/Forms/ServerEdit";

import ServerDisplay from "./components/ServerDisplay/ServerDisplay";
import UserHomePage from "./components/UserHome/UserHomePage";

import ProtectedRoute from "./components/Forms/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

import SplashPage from "./components/SplashPage/SplashPage";
import CreateServer from "./components/s3_test";

import Servers from "./components/test_server";
import CurrServer from "./components/test_cur_server";
import CurrChannel from "./components/test_cur_channel";

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
          <Route path="/test" exact={true}>
            <CreateServer />
            <Servers />
          </Route>
          <Route path="/test_single" exact={true}>
            <CurrServer />
            <CurrChannel />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>

          <ProtectedRoute path="/me" exact={true}>
            <UserHomePage></UserHomePage>
          </ProtectedRoute>

          <ProtectedRoute path="/servers/invite" exact={true}>
            <ServerInvite></ServerInvite>
          </ProtectedRoute>
          <ProtectedRoute path="/servers/serverId/edit" exact={true}>
            <ServerEdit></ServerEdit>
          </ProtectedRoute>
          <ProtectedRoute path="/servers/:serverUuid">
            <ServerDisplay></ServerDisplay>
          </ProtectedRoute>
          <ProtectedRoute path="/servers/:serverUuid/:channelId">
            
          </ProtectedRoute>

          <ProtectedRoute path="/user/newServer" exact={true}>
            <NewServerForm></NewServerForm>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
