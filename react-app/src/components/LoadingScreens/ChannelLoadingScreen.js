import "./LoadingScreens.CSS/ChannelLoadingScreen.css";
import NoTextChannel from "../NoTextChannel/NoTextChannel";
// import UserHomeLoadingScreen from "./UserHomeLoadingScreen";
import { useEffect } from "react";
import { useState } from "react";

function ChannelLoadingScreen() {
  const [noText, setNoText] = useState(false);
  // console.log(noText);
  useEffect(() => {
    let t = setTimeout(() => {
      setNoText(true);
    }, 3000);
    return () => {
      clearTimeout(t);
    };
  }, []);
  return (
    <>
      {noText ? (
        <NoTextChannel></NoTextChannel>
      ) : (
        <div className="channel__load__image"></div>
      )}
    </>
  );
}

export default ChannelLoadingScreen;
