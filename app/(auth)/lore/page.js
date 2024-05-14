"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLore } from "@/context/LoreContext";
import CardSelection from "@/components/CardSelection";
import Button from "@/components/Button";
import { FaTimesCircle } from "react-icons/fa";

export default function LorePage() {
  const router = useRouter();
  // Global states:
  const {
    name,
    setName,
    characterClass,
    setCharacterClass,
    race,
    setRace,
    hometown,
    setHometown,
    hometownDescription,
    setHometownDescription,
  } = useLore();
  // Local states:
  const [error, setError] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedHometown, setSelectedHometown] = useState("");

  const randomName = [
    "Alaric",
    "Brynjar",
    "Eirik",
    "Finnian",
    "Gudrun",
    "Haldor",
    "Ivarr",
    "Jorunn",
    "Kelda",
    "Leifur",
    "Alfric",
    "Boden",
    "Eirlys",
    "Fjord",
    "Gunnar",
    "Hilda",
    "Jorgen",
    "Kjell",
    "Livana",
    "Magnus",
  ];

  const races = [
    {
      name: "Human",
      image: "./images/race/new-race-human.png",
      description:
        "Humans are versatile and adaptable, excelling in various roles due to their balanced abilities and potential",
    },
    {
      name: "Half-Elf",
      image: "./images/race/new-race-half-elf.png",
      description:
        "A versatile mix of human and elf, half-elves combine the best traits of both, excelling in social diplomacy and cultural adaptability",
    },
    {
      name: "Elf",
      image: "./images/race/new-race-elf.png",
      description:
        "Elves are graceful, long-lived beings with a deep connection to magic and the natural world, skilled in archery and wisdom",
    },
    {
      name: "Dwarf",
      image: "./images/race/new-race-dwarf.png",
      description:
        "Dwarves are stout and resilient, renowned for their combat prowess and unparalleled skills in mining and metalwork",
    },
  ];

  const classes = [
    {
      name: "Warrior",
      description:
        "Masters of combat, warriors excel in physical prowess, using weapons and armor to dominate the battlefield",
    },
    {
      name: "Ranger",
      description:
        "Skilled hunters and trackers, rangers wield bows and nature magic, adept at stealth and survival in wild terrains",
    },
    {
      name: "Mage",
      description:
        "Mages harness arcane energies to cast powerful spells, specializing in elemental manipulation and mystical knowledge",
    },
    {
      name: "Druid",
      description:
        "Druids are guardians of nature, able to shapeshift and summon natural energies, proficient in healing and elemental magic",
    },
  ];

  const hometowns = [
    {
      name: "Stoneholm",
      image: "./images/hometown/stoneholm.png",
      description:
        "A town perched high in the mountains, where the air carries whispers of adventure.",
    },
    {
      name: "Pineview",
      image: "./images/hometown/pineview.png",
      description:
        "A tranquil town surrounded by ancient forests, offering a peaceful sanctuary.",
    },
    {
      name: "Marinport",
      image: "./images/hometown/marinport.png",
      description:
        "A bustling harbor town known for its seafaring quests and vibrant trade.",
    },
    {
      name: "Eldorvik",
      image: "./images/hometown/eldorvik.png",
      description:
        "A town nestled among misty fjords, blending ancient magic with rugged natural beauty.",
    },
  ];

  const handleSelectRace = (race) => {
    setSelectedRace(race.name);
    setRace(race.name);
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls.name);
    setCharacterClass(cls.name);
  };

  const handleSelectHometown = (home) => {
    setSelectedHometown(home.name);
    setHometownDescription(home.description);
    setHometown(home.name);
  };

  function handleRandomName() {
    const randomIndex = Math.floor(Math.random() * randomName.length);
    setName(randomName[randomIndex]);
  }

  function handleStartAdventure() {
    if (!selectedRace) {
      setError(
        "Please select your character's race before starting the adventure."
      );
      return;
    }
    if (!selectedClass) {
      setError(
        "Please select your character's class before starting the adventure."
      );
      return;
    }
    if (!selectedHometown) {
      setError(
        "Please select your character's hometown before starting the adventure."
      );
      return;
    }
    if (!name.trim()) {
      setError(
        "Please enter your character's name before starting the adventure."
      );
      return;
    }

    router.push("/chat");
  }

  return (
    <>
      <section
        id="race"
        className="flex flex-col justify-center items-center gap-10 my-28"
      >
        <h1 className="text-5xl font-normal text-center">
          Choose your character race
        </h1>
        <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-1">
          {races.map((race) => (
            <CardSelection
              key={race.name}
              imgUrl={race.image}
              title={race.name}
              description={race.description}
              onClick={() => handleSelectRace(race)}
              isSelected={selectedRace === race.name}
            />
          ))}
        </div>
      </section>

      <section
        id="class"
        className="flex flex-col justify-center items-center gap-10 my-28"
      >
        <h1 className="text-5xl font-normal text-center">
          Choose your character class
        </h1>
        <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-1">
          {classes.map((cls) => (
            <CardSelection
              key={cls.name}
              imgUrl="https://garden.spoonflower.com/c/13102732/p/f/l/P9866QbjUtNyuiRFcNc1MUGiWPma_LbN5OFaB2OK9GsDqlAr5eZRvlA/gray%20checkerboard.jpg"
              title={cls.name}
              description={cls.description}
              onClick={() => handleSelectClass(cls)}
              isSelected={selectedClass === cls.name}
            />
          ))}
        </div>
      </section>

      <section
        id="town"
        className="flex flex-col justify-center items-center gap-10 my-28"
      >
        <h1 className="text-5xl font-normal text-center">
          Choose your character home
        </h1>
        <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-1">
          {hometowns.map((home) => (
            <CardSelection
              key={home.name}
              imgUrl={home.image}
              title={home.name}
              description={home.description}
              onClick={() => handleSelectHometown(home)}
              isSelected={selectedHometown === home.name}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-10 m-28">
        <h1 className="text-5xl font-normal text-center">
          Enter Your Character's Name
        </h1>
        <p>Write your character name or generate.</p>
        <div className="flex gap-2 pb-12">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-[80%] bg-formbg placeholder:text-textcolor h-16 rounded-xl"
          />
          <Button
            onClick={() => handleRandomName()}
            className="w-1/5"
            size="rounded-xl h-16 px-3"
          >
            Generate
          </Button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-800 mt-3 flex p-3 align-middle gap-3 items-center">
            <FaTimesCircle /> {error}
          </div>
        )}
        <Button
          radius="rm"
          size="h-16 large w-full"
          onClick={() => handleStartAdventure()}
        >
          Start Adventure
        </Button>
      </section>
    </>
  );
}
