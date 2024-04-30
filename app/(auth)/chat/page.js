"use client";
import Button from "@/components/Button";
import { useApi } from "@/context/ApiContext";
import { useLore } from "@/context/LoreContext";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
	// Global
	const { apiKey } = useApi();
	const { name, characterClass, race, hometown } = useLore();

	// Local
	const [message, setMessage] = useState(
		`This is my first time. My characters name is ${name}, I am a ${characterClass}, I am from the ${race} race, My hometown is ${hometown}`
	);
	const [response, setResponse] = useState("");
	const [history, setHistory] = useState([]);
	const hasSentInitialMessage = useRef(false);

	const sendMessage = async () => {
		if (!apiKey) {
			alert("API Key is not set.");
			return;
		}
		if (!message) {
			alert("Please enter a message.");
			return;
		}
		const trimmedMessage = message.trim();
		setMessage(trimmedMessage.toString());
		setHistory((prevHistory) => {
			const newHistory = prevHistory.length >= 4 ? prevHistory.slice(1) : prevHistory;
			return [...newHistory, "user: " + trimmedMessage];
		});
    
		const context = JSON.stringify({
			context: {
				character: {
					name: name,
					class: characterClass,
					race: race,
				},
				summary: "Summary of recent and current events",
				location: "Current location",
				world: {
					type: "fantasy",
					characterHometown: hometown,
				},
				message: trimmedMessage,
				suggestions: "Provide suggestions of what to do next",
			},
    });
    

		try {
			const response = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					// NOTE GPT VERSION IS 4 NOW
					model: "gpt-4-1106-preview",
					response_format: { type: "json_object" },
					temperature: 0.0,
					max_tokens: 400,
					messages: [
						{
							role: "user",
							content: message,
						},
						{
							role: "system",
							content:
								"You are a dungeon master, you guide the user on an adventure. The user is assuming the role of a character.",
						},
						{
							role: "system",
							content: "History log: " + history.toString(),
						},
						{
							role: "system",
							content: `The user characters hometown: ${hometown}, race: ${race}, name: ${name} and class: ${characterClass} can not be changed. Update context based on history, reply and user message each time to reflect what is going on.`,
						},
						{
							role: "system",
							content:
								"Tell the user what happens from a second person perspective, and present 3 suggestions for what to do next.",
						},
						{
							role: "system",
							content: "You always reply with a JSON object. You do not include qoutation marks or literals in response.",
						},
						{
							role: "system",
							content: context,
						},
					],
				}),
			});

			const data = await response.json();

			if (response.ok) {
				const fullMessageObject = data.choices[0].message.content;
				console.log("Full message object:", fullMessageObject);
				const parsedFullMessageObject = JSON.parse(fullMessageObject);
				const messageContent = parsedFullMessageObject.context.message;
				setResponse(messageContent);
				setHistory((prevHistory) => {
					const newHistory = prevHistory.length >= 4 ? prevHistory.slice(1) : prevHistory;
					return [...newHistory, "system: " + messageContent];
				});
				console.log(history.toString());
				setMessage("");
			} else {
				throw new Error(data.error.message || "Failed to fetch response from OpenAI");
			}
		} catch (error) {
			console.error("API request failed.");
			setResponse("Failed to send message. Please try again.");
		}
		hasSentInitialMessage.current = true;
	};

	/* 
	-- Initial message using useEffect --
	Important: In production we should remove hasSentInitialMessage and timeout as strict mode is no longer needed. At the moment we need it to not call api twice on first page load.
	*/
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!hasSentInitialMessage.current) {
				sendMessage().then(() => {
					hasSentInitialMessage.current = true;
				});
			}
		}, 2000);

		return () => clearTimeout(timeout);
	}, []);

	return response != "" ? (
		<div>
			<h1>Chat with AI</h1>
			<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message" />
			<Button onClick={sendMessage}>Send</Button>
			{response && <p>Response: {response}</p>}
		</div>
	) : (
		<div>Loading...</div>
	);
}
