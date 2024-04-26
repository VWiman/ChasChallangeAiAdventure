"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleValidation = () => {
    router.push("/validate");
  };
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
        <button onClick={handleValidation}>Get started</button>
      </div>
    </main>
  );
}
