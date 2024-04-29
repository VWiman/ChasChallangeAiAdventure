"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLore } from "@/context/LoreContext";
import RaceComponent from "@/components/Race";
import ClassComponent from "@/components/Class";
import TownComponent from "@/components/Town";
import Button from "@/components/Button";
import { FaTimesCircle} from "react-icons/fa";

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
			<div className="flex my-8 gap-3">
				<div className="w-1/2 bg-slate-50 p-4">
					<h1>Lore</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
					</p>
				</div>
				<div className="w-1/2 bg-slate-50 p-4">
					<form className="flex flex-col gap-1" onSubmit={handleSubmit}>
						<label className="block">
							<span className="text-gray-600">Add your name</span>
							<input className="mt-1 block w-full" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
						</label>					
						<RaceComponent />
						<ClassComponent />
						<TownComponent />
						<Button type="submit">Submit</Button>
					</form>
					{error && <div className="bg-red-100 text-red-800 mt-3 flex p-3 align-middle gap-3 items-center"><FaTimesCircle /> {error}</div>}
				</div>
			</div>
			
		</>
	);
}
