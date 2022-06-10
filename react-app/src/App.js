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
import UserInboxPage from "./components/UserHome/UserInboxPage";


import ProtectedRoute from "./components/Forms/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import { getAllUsers } from "./store/users";

import SplashPage from "./components/SplashPage/SplashPage";
import CreateServer from "./components/s3_test";

import Servers from "./components/test_server";
import CurrChannel from "./components/test_cur_channel";
import CurrInbox from "./components/test_direct_messages";
import Channels from "./components/test_channel";
import DMs from "./components/dm";

import UserHomeLoadingScreen from "./components/LoadingScreens/UserHomeLoadingScreen";
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
            <Channels />
          </Route>
          <Route path="/test_channel" exact={true}>
            <CurrChannel />
          </Route>
          <Route path="/test_direct_messages" exact={true}>
            <CurrInbox />
          </Route>
          <Route path="/dms" exact={true}>
            <DMs />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/me">
            <UserHomePage></UserHomePage>
          </ProtectedRoute>
          {/* <ProtectedRoute path="/me/:inbox_uuid" exact={true}>
            <UserInboxPage></UserInboxPage>
          </ProtectedRoute> */}
          <ProtectedRoute path="/servers/invite" exact={true}>
            <ServerInvite></ServerInvite>
          </ProtectedRoute>
          <ProtectedRoute path="/servers/serverId/edit" exact={true}>
            <ServerEdit></ServerEdit>
          </ProtectedRoute>
          <ProtectedRoute path="/user/newServer" exact={true}>
            <NewServerForm></NewServerForm>
          </ProtectedRoute>
          {/* <ProtectedRoute path="/servers/:serverUuid/:channelId">
            <h1>this is working</h1>
          </ProtectedRoute> */}
          <ProtectedRoute path="/poop2295" exact={true}>
            <UserHomeLoadingScreen></UserHomeLoadingScreen>
          </ProtectedRoute>

          <ProtectedRoute path="/servers/:serverUuid">
            <ServerDisplay></ServerDisplay>
          </ProtectedRoute>
          <ProtectedRoute path="/servers/:serverUuid/:channelUuid">
            <ServerDisplay></ServerDisplay>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
