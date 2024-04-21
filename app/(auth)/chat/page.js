"use client";
import { useApi } from "@/context/ApiContext";
import { useState } from "react";

export default function Chat() {
	const { apiKey } = useApi();
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");
	const [history, setHistory] = useState([]);

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
			return [...newHistory, trimmedMessage];
		});
		try {
			const response = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: "gpt-3.5-turbo",
					response_format: { type: "json_object" },
					temperature: 0.75,
					max_tokens: 300,
					messages: [
						{
							role: "system",
							content:
								"You are a storyteller, you guide the user on an adventure. The user is assuming the role of a character.",
						},
						{
							role: "system",
							content:
								"If the character is hurt during the story you put the amount of hp lost in the stats section of the response. If no hp is lost, you put 0.",
						},
						{
							role: "system",
							content:
								`You always consider the conversation history to set the current context in the context section of the response. Include important information and current location. You update context every time you answer. You always end your output with a question. History log: ` +
								history.toString(),
						},
						{
							role: "system",
							content: `You are designed to only output JSON object in a string like: {"context": {"character": "example", "summary": "example", "location": "example"}, "message":  "example", "stats": {"loss": 0}}`,
						},
						{
							role: "user",
							content: message,
						},
					],
				}),
			});

			const data = await response.json();

			if (response.ok) {
				const lastMessage = data.choices[0].message.content;
				setResponse(lastMessage.toString());
				setHistory((prevHistory) => {
					const newHistory = prevHistory.length >= 4 ? prevHistory.slice(1) : prevHistory;
					return [...newHistory, lastMessage];
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
	};

	return (
		<div>
			<h1>Chat with AI</h1>
			<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message" />
			<button onClick={sendMessage}>Send</button>
			{response && <p>Response: {response}</p>}
		</div>
	);
}
