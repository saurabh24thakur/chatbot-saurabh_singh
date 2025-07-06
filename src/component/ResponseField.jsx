import React from "react";

function ResponseField({ messages }) {
  return (
    <>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-xs p-3 rounded-xl text-sm ${
            msg.sender === "bot" ? "bg-blue-700 self-start" : "bg-blue-500 self-end ml-auto"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </>
  );
}

export default ResponseField;
