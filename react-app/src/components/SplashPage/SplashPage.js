import React from "react";
import HeaderNav from "./HeaderNav/HeaderNav";
import SplashTopCard from "./SplashTopCard";
import SplashMiddleCard from "./SplashMiddleCard";
import SplashBottomCard from "./SplashBottomCard";
import ReliableTechCard from "./ReliableTechCard";
import SplashJourney from "./SplashJourney";
import SplashFooter from "./SplashFooter";

function SplashPage() {
  return (
    <div>
      <HeaderNav></HeaderNav>
      <SplashTopCard></SplashTopCard>
      <SplashMiddleCard></SplashMiddleCard>
      <SplashBottomCard></SplashBottomCard>
      <ReliableTechCard></ReliableTechCard>
      <SplashJourney></SplashJourney>
      <SplashFooter></SplashFooter>
    </div>
  );
}

export default SplashPage;
