"use client";
import Button from "@/components/Button";
import { useApi } from "@/context/ApiContext";
import { useLore } from "@/context/LoreContext";
import { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Chat() {
	<NavBar />;

	// Global
	const { apiKey } = useApi();
	const { name, characterClass, race, hometown, hometownDescription } = useLore();

	// Local
	const [message, setMessage] = useState(
		`This is my first time. My characters name is ${name}, I am a ${characterClass}, I am from the ${race} race, My hometown is ${hometown} ${hometownDescription}.`
	);
	const [response, setResponse] = useState("");
	const [history, setHistory] = useState(["user: " + message]);
	// Full history is used only for summary button, send it during chat.
	const [fullHistory, setFullHistory] = useState("");
	const [fullUserHistory, setFullUserHistory] = useState([message]);
	const [fullSystemHistory, setFullSystemHistory] = useState([]);
	const [displayHistory, setDisplayHistory] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const hasSentInitialMessage = useRef(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [summary, setSummary] = useState("");
	const [hideUserResponse, setHideUserResponse] = useState(false);

	// Summary button loading functionality
	const [loadingSummary, setLoadingSummary] = useState(false);

	const sendMessage = async (userMessage = message) => {
		if (!apiKey) {
			alert("API Key is not set.");
			return;
		}

		if (!userMessage) {
			alert("Please enter a message.");
			return;
		}

		setFullUserHistory((prevFullUserHistory) => {
			const newFullUserHistory = prevFullUserHistory.length >= 1 ? prevFullUserHistory : "";
			return [...newFullUserHistory, userMessage];
		});

		setHistory((prevHistory) => {
			const newHistory = prevHistory.length >= 4 || prevHistory.length === 1 ? prevHistory.slice(1) : prevHistory;
			return [...newHistory, " user: " + userMessage];
		});

		const content = JSON.stringify({
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
				message: "Response to " + userMessage,
			},
			suggestions: "Provide suggestions of what to do next",
		});

		try {
			setIsWaiting(true);
			const response = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					// NOTE GPT VERSION IS 4 NOW IN USE
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
								"Tell the user what happens from a second person perspective, and present 3 suggestions for what to do next. Dont pose the questions in your text response, only present suggestions in suggestions.",
						},
						{
							role: "system",
							content:
								"You always reply with a JSON object. You do not include qoutation marks or literals in response.",
						},
						{
							role: "system",
							content: content,
						},
					],
				}),
			});

			const data = await response.json();

			if (response.ok) {
				const fullMessageObject = JSON.parse(data.choices[0].message.content);
				console.log("Full message object:", fullMessageObject);
				setResponse(fullMessageObject.context.message);
				setSuggestions(fullMessageObject.suggestions);
				setFullSystemHistory((prevFullSystemHistory) => {
					return [
						...prevFullSystemHistory,
						<p className="py-2" key={fullMessageObject.context.message.slice(10)}>
							{fullMessageObject.context.message}
						</p>,
					];
				});
				setHistory((prevHistory) => {
					const newHistory = prevHistory.length >= 4 ? prevHistory.slice(1) : prevHistory;
					return [...newHistory, "system: " + fullMessageObject.context.message];
				});
				setMessage("");
				setIsWaiting(false);
			} else {
				setIsWaiting(false);
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
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	// Logging history
	useEffect(() => {
		console.log("Recent history: ", history);
		console.log("Full user history: ", fullUserHistory);
		console.log("Full system history: ", fullSystemHistory);
		console.log("Full history: ", fullHistory);
	}, [history, fullUserHistory]);

	useEffect(() => {
		setFullHistory(fullHistory + response + "\n");
		setDisplayHistory((prevDisplayHistory) => {
			const newDisplayHistory = prevDisplayHistory;
			return [...newDisplayHistory, <p key={response.slice(0, 10)}>{response}</p>];
		});
	}, [fullSystemHistory]);

	useEffect(() => {
		setFullHistory((prevFullHistory) => {
			const newFullHistory = fullUserHistory.length >= 2 ? prevFullHistory + message + "\n" : "";
			return newFullHistory;
		});

		setDisplayHistory((prevDisplayHistory) => {
			const newDisplayHistory = prevDisplayHistory;
			return [
				...newDisplayHistory,
				<p className="text-browngray py-2 pl-3 my-3 border-l-2 border-formbg" key={message.slice(0, 10)}>
					{message}
				</p>,
			];
		});
	}, [fullUserHistory]);

	function handleSuggestion(suggestion) {
		setMessage(suggestion);
		sendMessage(suggestion);
	}

	const handleSendSummary = async () => {
		setLoadingSummary(true);
		console.log("Starting fetch...");
		try {
			const response = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: "gpt-4-1106-preview",
					temperature: 0.0,
					max_tokens: 2000,
					messages: [
						{
							role: "user",
							content: fullHistory,
						},
						{
							role: "system",
							content:
								"You are a fantasy novel author. Summarize into a short-story. Your response should not include any formating.",
						},
					],
				}),
			});

			const data = await response.json();

			if (response.ok && data.choices && data.choices.length > 0 && data.choices[0].message.content) {
				const fullSummary = JSON.stringify(data.choices[0].message.content);
				const newFullSummary = fullSummary.slice(1, -1).replace(/\\n/g, "\n").replace(/\\/g, "");
				setSummary(newFullSummary);
			} else {
				throw new Error((data.error && data.error.message) || "Failed to fetch response from OpenAI");
			}
		} catch (error) {
			console.error("API request failed:", error);
			setResponse("Failed to send message. Please try again.");
		} finally {
			setLoadingSummary(false); // loadingSummary = false after fetch done
		}
	};

	return response != "" ? (
		<div>
			<div className="flex flex-col m-auto mt-20 justify-center items-center text-lg max-w-4xl">
				<h1>{name}´s adventure</h1>
				<section className="py-2 leading-tight">
					{hideUserResponse ? fullSystemHistory : displayHistory.slice(5)}
				</section>

				<ul className="flex flex-col my-10 gap-2 w-full">
					<div className=" inline-flex justify-between items-center">
						<h3 className="text-primary">Select your next action:</h3>
						<p className="text-xs">
							Show & Hide my action{" "}
							<button
								className="w-8 h-8 rounded-full bg-primary inline-flex items-center justify-center"
								onClick={() => setHideUserResponse(!hideUserResponse)}>
								{hideUserResponse ? <FiEye /> : <FiEyeOff />}
							</button>
						</p>
					</div>

					{isWaiting ? (
						<li className="inline-flex items-center flex-row text-left text-lg px-[20px] py-[10px] p-10 my-10 w-full text-browngray">
							<svg className="animate-spin h-5 w-5 mr-3 border border-l border-primary border-l-primary/30 rounded-full"></svg>
							Loading content, please wait...
						</li>
					) : (
						suggestions &&
						suggestions.map((suggestion, index) => (
							<li className="border-l-2 border-formbg hover:border-cardbg" key={index}>
								<button
									className="w-full text-left text-lg px-[20px] py-[10px] text-browngray hover:text-textcolor  hover:bg-formbg"
									onClick={() => handleSuggestion(suggestion)}>
									{suggestion}
								</button>
							</li>
						))
					)}
				</ul>
			</div>

			<div className="flex flex-col max-w-4xl m-auto justify-center items-center pb-16 pt-8">
				{loadingSummary ? "" :
					<Button radius="rm" size="large" onClick={handleSendSummary}>
						Summarize
					</Button>}
				{loadingSummary ? (
					<div className="flex justify-center items-center p-10 my-10 w-full text-lg px-[20px] py-[10px] text-browngray">
						<svg className="animate-spin h-5 w-5 mr-3 border border-l border-primary border-l-primary/30 rounded-full"></svg>
						<p>Summary is loading...</p>
					</div>
				) : (
					summary && (
						<pre className="p-10 my-10 whitespace-pre-wrap text-slate-800 bg-amber-50/70 text-lg leading-relaxed">
							{summary}
						</pre>
					)
				)}
			</div>
		</div>
	) : (
		<div className="mycontainer flex justify-center items-center mt-20">
			<h2>Loading, please wait...</h2>
		</div>
	);
}
