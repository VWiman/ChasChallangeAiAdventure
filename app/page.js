"use client";
import HowWork from "@/components/HowWork";
import MainHero from "@/components/MainHero";


export default function Home() {

  return (
		// Note that the main for the other pages is in layout under auth
    <main className="">
      <MainHero />
      <HowWork />
		</main>
	);
}
