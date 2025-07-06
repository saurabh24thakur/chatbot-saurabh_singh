import React, { useState,useContext } from "react";
import { userDataContext } from "../context/UserContext";
import VAImage from "../assets/assistant1.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PromptInput from "../component/PromptInput";
import ResponseField from "../component/ResponseField";

function Home() {
  const navigate = useNavigate();
  const { userData, serverUrl, setUserdata } = useContext(userDataContext);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);

  const logOutButttonHandler = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log("logged out");
      console.log(result);
      setUserdata(null);
      navigate("/signup");
    } catch (error) {
      setUserdata(null);
      console.log("Error during logout", error);
    }
  };


  const sendMessage = async (userText) => {
    if (!userText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const response = await axios.post(`${serverUrl}/api/chat`, {
        prompt: userText,
      });

      const botReply = response.data.reply || "Sorry, I didn't understand that.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong." }]);
    }

    setLoading(false);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 text-white p-4">
      <div className="max-w-4xl mx-auto bg-blue-800 bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <img src={VAImage} alt="Virtual Assistant" className="w-12 h-12 rounded-full border-2 border-blue-400" />
            <h1 className="text-xl font-semibold">Welcome, {userData?.name || "User"}</h1>
          </div>
          
          <button
            onClick={logOutButttonHandler}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 [&::-webkit-scrollbar]:hidden">
          <ResponseField  messages={messages}/>
        </div>

        <PromptInput  sendMessage={sendMessage} loading={loading}/>
      </div>
    </div>
  );
}

export default Home;
