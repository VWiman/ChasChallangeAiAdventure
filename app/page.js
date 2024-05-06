"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCcStripe } from "react-icons/fa";

export default function Home() {
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
    // Note that the main for the other pages is in layout under auth
		<main className="container mx-auto max-w-5xl px-3">
			<div>
				<h1>Begin your {teaserFact} adventure today! </h1>

				<p>
					Welcome to the gateway of your own epic saga. Here, you are not just a visitor but the very heart of a grand
					adventure. Craft your hero, shape your destiny, and dive into a realm where your choices forge the path ahead.
					With every decision, the story unfolds, guided by an enigmatic AI storyteller. Are you ready to discover the
					unknown, face mystical challenges, and emerge as the architect of your own legendary tale? Step forward and
					transform your imagination into an unforgettable narrative.
				</p>
				<Button radius="rsm" onClick={handleValidation}>
					Get started
				</Button>
			</div>
		</main>
	);
}
