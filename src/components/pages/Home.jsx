import Counters from "../fragments/home/Counters";
import Features from "../fragments/home/Features";
import Hero from "../fragments/home/Hero";
import NewFeatures from "../fragments/home/NewFeatures";
import Pricing from "../fragments/home/Pricing";
import WhatYouSearchFor from "../fragments/home/WhatYouSearchFor";
function Home() {
  return (
    <>
      <Hero />
      <Counters />
      <Features/>
      <Pricing/>
      <NewFeatures/>
      <WhatYouSearchFor/>
    </>
  );
}

export default Home;
