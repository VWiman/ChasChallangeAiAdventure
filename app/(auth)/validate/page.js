"use client";
import { useApi } from "@/context/ApiContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Validate() {
	const [localApiKey, setLocalApiKey] = useState("");
	const [error, setError] = useState("");
	const { setApiKey } = useApi();
	const router = useRouter();

	const validateApiKey = async (apiKey) => {
		try {
			const response = await fetch(`https://api.openai.com/v1/models`, {
				headers: { Authorization: `Bearer ${apiKey}` },
			});
			if (!response.ok) throw new Error(`Failed to validate API key: ${response.status}`);

			setApiKey(apiKey);
			router.push("/chat");
		} catch (error) {
			setError(error.message);
		}
	};

	const handleValidation = () => {
		if (localApiKey.trim() === "") {
			setError("API Key cannot be empty.");
			return;
		}
		validateApiKey(localApiKey);
	};

	return (
		<div>
			<h1>Enter Your OpenAI API Key</h1>
			<input type="text" value={localApiKey} onChange={(e) => setLocalApiKey(e.target.value)} placeholder="API Key" />
			<button onClick={handleValidation}>Validate</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}
