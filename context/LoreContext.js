"use client";
import { createContext, useContext, useState } from "react";

const LoreContext = createContext();

export function useLore() {
	return useContext(LoreContext);
}

export function LoreProvider({ children }) {
	const [name, setName] = useState("");
	const [characterClass, setCharacterClass] = useState("");
	const [race, setRace] = useState("");
	const [hometown, setHometown] = useState("");
	const [hometownDescription, setHometownDescription] = useState("");

	return (
		<LoreContext.Provider
			value={{
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
			}}>
			{children}
		</LoreContext.Provider>
	);
}
