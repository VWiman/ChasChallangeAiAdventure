"use client";
import Button from "@/components/Button";
import { useApi } from "@/context/ApiContext";
import { useLore } from "@/context/LoreContext";
import { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar";

export default function Chat() {
  <NavBar />;

  // Global
  const { apiKey } = useApi();
  const { name, characterClass, race, hometown } = useLore();

  // Local
  const [message, setMessage] = useState(
    `This is my first time. My characters name is ${name}, I am a ${characterClass}, I am from the ${race} race, My hometown is ${hometown}.`
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
      const newFullUserHistory =
        prevFullUserHistory.length >= 1 ? prevFullUserHistory : "";
      return [...newFullUserHistory, userMessage];
    });

    setHistory((prevHistory) => {
      const newHistory =
        prevHistory.length >= 4 || prevHistory.length === 1
          ? prevHistory.slice(1)
          : prevHistory;
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
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
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
                content:
                  "You always reply with a JSON object. You do not include qoutation marks or literals in response.",
              },
              {
                role: "system",
                content: content,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const fullMessageObject = JSON.parse(data.choices[0].message.content);
        console.log("Full message object:", fullMessageObject);
        setResponse(fullMessageObject.context.message);
        setSuggestions(fullMessageObject.suggestions);
        setFullSystemHistory((prevFullSystemHistory) => {
          return [...prevFullSystemHistory, fullMessageObject.context.message];
        });
        setHistory((prevHistory) => {
          const newHistory =
            prevHistory.length >= 4 ? prevHistory.slice(1) : prevHistory;
          return [
            ...newHistory,
            "system: " + fullMessageObject.context.message,
          ];
        });
        setMessage("");
        setIsWaiting(false);
      } else {
        setIsWaiting(false);
        throw new Error(
          data.error.message || "Failed to fetch response from OpenAI"
        );
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
    }, 1500);

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
      return [
        ...newDisplayHistory,
        <p key={response.slice(0, 10)}>{response}</p>,
      ];
    });
  }, [fullSystemHistory]);

  useEffect(() => {
    setFullHistory((prevFullHistory) => {
      const newFullHistory =
        fullUserHistory.length >= 2 ? prevFullHistory + message + "\n" : "";
      return newFullHistory;
    });

    setDisplayHistory((prevDisplayHistory) => {
      const newDisplayHistory = prevDisplayHistory;
      return [
        ...newDisplayHistory,
        <p key={message.slice(0, 10)}>
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
    console.log("Starting fetch...");
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
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
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        data.choices &&
        data.choices.length > 0 &&
        data.choices[0].message.content
      ) {
        const fullSummary = JSON.stringify(data.choices[0].message.content);
        const newFullSummary = fullSummary
          .slice(1, -1)
          .replace(/\\n/g, "\n")
          .replace(/\\/g, "");
        setSummary(newFullSummary);
      } else {
        throw new Error(
          (data.error && data.error.message) ||
            "Failed to fetch response from OpenAI"
        );
      }
    } catch (error) {
      console.error("API request failed:", error);
      setResponse("Failed to send message. Please try again.");
    }
  };

  return response != "" ? (
		<>
			<div className="text-lg">
				<h1>Chat with AI</h1>
				{displayHistory.slice(4)}
				<ul className="flex flex-col my-10 gap-2">
					{suggestions &&
						suggestions.map((suggestion, index) => (
							<li className="max-w-[810px] border-l border-black/20 hover:border-black/30" key={index}>
								<button
									className="w-full text-left text-lg px-[20px] py-[10px] hover:bg-black/5"
									onClick={() => handleSuggestion(suggestion)}
									disabled={isWaiting}>
									{suggestion}
								</button>
							</li>
						))}
				</ul>
			</div>
			<div>
				<Button onClick={() => handleSendSummary()}>Summarize</Button>
				<pre className="p-10 my-10 whitespace-pre-wrap text-slate-800 bg-stone-100 text-lg leading-relaxed">
					{summary}
				</pre>
			</div>
		</>
	) : (
		<div>Loading...</div>
	);
}
