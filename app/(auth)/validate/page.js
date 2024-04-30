"use client";
import Button from "@/components/Button";
import { useApi } from "@/context/ApiContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimesCircle} from "react-icons/fa";

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
      if (!response.ok)
        throw new Error(`Failed to validate API key: ${response.status}`);

      setApiKey(apiKey);
      router.push("/lore");
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
      <div className="flex gap-2">
      <input
        type="text"
        value={localApiKey}
        onChange={(e) => setLocalApiKey(e.target.value)}
        placeholder="API Key"
        className="w-4/5"
        />
        <div className="w-1/5">
          <Button className="bg-red-900" onClick={handleValidation}>Validate</Button>
        </div>
      </div>
      {error && <div className="bg-red-100 text-red-800 mt-3 flex p-3 align-middle gap-3 items-center"><FaTimesCircle /> {error}</div>}
    </div>
  );
}
