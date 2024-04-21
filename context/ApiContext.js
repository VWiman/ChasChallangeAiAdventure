"use client"
import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export function useApi() {
	return useContext(ApiContext);
}

export function ApiProvider({ children }) {
	const [apiKey, setApiKey] = useState("");

	return <ApiContext.Provider value={{ apiKey, setApiKey }}>{children}</ApiContext.Provider>;
}