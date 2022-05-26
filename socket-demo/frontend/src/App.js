import React from "react";
import { Route, Switch } from "react-router-dom";
import Chat from "./components/chat";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route path="/chatroom_1" exact>
          <Chat />
        </Route>
        <Route path="/chatroom_2" exact>
          <Chat />
        </Route>
      </Switch>
    </>
  );
}

export default App;
