"use client";
import HowWork from "@/components/HowWork";
import MainHero from "@/components/MainHero";
import StorySum from "@/components/StorySum";


export default function Home() {

  return (
		// Note that the main for the other pages is in layout under auth
    <main className="">
      <MainHero />
      <HowWork />
      <div className="mycontainer pt-16 pb-32">
        <h3 className=" mb-6">How their stories began..</h3>
        <StorySum />
      </div>
		</main>
	);
}
