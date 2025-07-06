import React, { useState } from "react";

function PromptInput({ sendMessage, loading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="flex-1 p-3 rounded-xl bg-blue-700 placeholder-blue-300 focus:outline-none"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={loading}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
        disabled={loading}
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}

export default PromptInput;
