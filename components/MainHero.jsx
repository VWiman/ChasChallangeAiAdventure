"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function MainHero() {

  const router = useRouter();
  const handleValidation = () => {
    router.push("/validate");
  };

  const [teaserFact, setTeaserFact] = useState();

  const fact = ["graceful", "brave", "elegant", "mystical"];

  const fetchTeaserFact = () => {
    const randomIndex = Math.floor(Math.random() * fact.length);
    setTeaserFact(fact[randomIndex]);
  };

  useEffect(() => {
    fetchTeaserFact();
    const timer = setInterval(() => {
      fetchTeaserFact();
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  


	return (
			<section className="bg-cover bg-center min-h-[600px] w-full flex items-center" style={{ 
        backgroundImage: ` linear-gradient(0deg, rgba(28,25,23,1) 6%, rgba(28,25,23,0) 63%), url('./images/new_dark_hero.png')`
      }}> 
        <div className="mycontainer">
          <div className="flex flex-col gap-8 items-center text-center">
            <h1>Begin your {teaserFact} adventure today! </h1>
            <p>
              Welcome to the gateway of your own epic saga. Here, you are not just a visitor but the very heart of a grand
              adventure. Craft your hero, shape your destiny, and dive into a realm where your choices forge the path ahead.
              With every decision, the story unfolds, guided by an enigmatic AI storyteller. Are you ready to discover the
              unknown, face mystical challenges, and emerge as the architect of your own legendary tale? Step forward and
              transform your imagination into an unforgettable narrative.
            </p>
            <Button size="large w-80" radius="rsm" onClick={handleValidation}>
              Start your adventure
            </Button>
          </div>
        </div>
			</section>
	);
}