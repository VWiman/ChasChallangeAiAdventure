"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const handleValidation = () => {
    router.push("/validate");
  };

  const [teaserFact, setTeaserFact] = useState();

  const fact = ["graceful", "brave", "elegant", "mystical"];
  return (
    <main>
      <div>
        <h1>Begin your adventure today!</h1>
        <p>
          Welcome to the gateway of your own epic saga. Here, you are not just a
          visitor but the very heart of a grand adventure. Craft your hero,
          shape your destiny, and dive into a realm where your choices forge the
          path ahead. With every decision, the story unfolds, guided by an
          enigmatic AI storyteller. Are you ready to discover the unknown, face
          mystical challenges, and emerge as the architect of your own legendary
          tale? Step forward and transform your imagination into an
          unforgettable narrative.
        </p>
        <Button radius="rsm" onClick={handleValidation}>
          Get started
        </Button>
      </div>
    </main>
  );
}
