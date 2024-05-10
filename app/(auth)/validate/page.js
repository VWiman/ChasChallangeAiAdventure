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
    <div className="flex flex-col gap-5 items-center text-center py-10 min-h-[80vh]">
      
      <h1>Enter Your API-key</h1>
      <p>Before you can begin your adventure, please enter your API key for validation.</p>
      <div className="container mx-auto max-w-4xl flex gap-2">
        <input
          type="text"
          value={localApiKey}
          onChange={(e) => setLocalApiKey(e.target.value)}
          placeholder="API Key"
          className="w-[80%] bg-formbg placeholder:text-textcolor h-16 rounded-xl"
          />
          <div className="w-[20%]">
            <Button size="h-16 w-full rounded-xl" onClick={handleValidation}>Validate</Button>
          </div>
      </div>
      {error && <div className="bg-red-100 text-red-800 mt-3 flex p-3 align-middle gap-3 items-center "><FaTimesCircle /> {error}</div>}
    </div>
  );
}
