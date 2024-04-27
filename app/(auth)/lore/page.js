"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLore } from "@/context/LoreContext";
import RaceComponent from "@/components/Race";
import ClassComponent from "@/components/Class";
import TownComponent from "@/components/Town";

export default function LorePage() {
	const router = useRouter();

	const { name, setName, characterClass, race, hometown } = useLore();

	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !characterClass || !race || !hometown) {
			setError("All fields need to be filled in");
			return;
		}
		try {
			router.push("/chat");
		} catch (error) {
			setError("There was a small problem: ", error);
			console.log(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
				<RaceComponent />
				<ClassComponent />
				<TownComponent />
				<button type="submit">Submit</button>
			</form>

			{error && <p style={{ color: "red" }}>{error}</p>}
		</>
	);
}
