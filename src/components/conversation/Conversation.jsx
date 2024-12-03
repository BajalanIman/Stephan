import React, { useState, useEffect } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ViewSidebarRounded from "@mui/icons-material/ViewSidebarRounded";
import TravelExploreOutlined from "@mui/icons-material/TravelExploreOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import Chats from "./Chats";
import AdminPanel from "../Admin/AdminPanel";

const Conversation = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [customChat, setCustomChat] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [answerAI, setAnswerAI] = useState("");
  const [conversations, setConversations] = useState([]);
  const [customConversationId, setCustomConversationId] = useState(null);
  const [userId, setUserID] = useState(null);

  useEffect(() => {
    const id = Number(localStorage.getItem("userId"));
    setUserID(id);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchConversations();
    }
  }, [userId]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8800/conversations`);
      const filteredConversations = response.data.filter(
        (e) => e.user_id === userId
      );
      setConversations(filteredConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const payload = { messages: searchInput };
    setShowLoading(true);

    try {
      // every time I have to change this url
      const response = await axios.post(
        "http://34.105.170.112:5000/chat",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.response;
      setAnswerAI(aiResponse);

      let conversationId = customConversationId;
      if (!conversationId) {
        const conversationResponse = await axios.post(
          "http://127.0.0.1:8800/conversations",
          {
            user_id: userId,
            title: searchInput.slice(0, 50),
          }
        );
        conversationId = conversationResponse.data.id;
        setCustomConversationId(conversationId);
      }

      const newMessage = {
        conversation_id: conversationId,
        user_id: userId,
        question: searchInput,
        answer: aiResponse,
      };

      await axios.post("http://127.0.0.1:8800/messages", newMessage);

      setCustomChat((prevChat) => [
        ...prevChat,
        {
          message_id: Math.random(),
          question: searchInput,
          answer: aiResponse,
        },
      ]);

      fetchConversations();
      setSearchInput("");
    } catch (error) {
      console.error("Error handling submit:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <div className="w-full h-[100%] flex relative">
      {!showSidebar && (
        <Box
          sx={{
            height: 35,
            display: "flex",
            position: "fixed",
            left: 8,
            top: 45,
            zIndex: 2000,
          }}
        >
          <IconButton onClick={() => setShowSidebar(!showSidebar)}>
            <ViewSidebarRounded sx={{ color: "#696969" }} />
          </IconButton>
          <Tooltip title="New conversation" arrow>
            <IconButton
              onClick={() => {
                window.location.reload();
              }}
            >
              <AutorenewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Box
        sx={{
          width: showSidebar ? "300px" : "0",
          height: "100%",
          display: "flex",
          position: "fixed",
          transition: "transform 1s linear",
          transform: showSidebar ? "translateX(0)" : "translateX(-100%)",
          flexDirection: "column",
          justifyContent: "flex-start",
          pl: 2,
          pt: 5,
          gap: 1,
          borderRight: "1px solid gray",
          backgroundColor: "#ffffff",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {showSidebar && (
            <>
              <IconButton onClick={() => setShowSidebar(false)}>
                <ViewSidebarRounded sx={{ color: "#696969" }} />
              </IconButton>{" "}
              <div className="cursor-pointer flex">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    ml: 2,
                  }}
                >
                  Conversations
                </Typography>

                <AutorenewIcon
                  onClick={() => {
                    window.location.reload();
                  }}
                />
                <AdminPanel />
              </div>
            </>
          )}
        </Box>
        <Box sx={{ overflowY: "scroll", mb: 2, height: "100%" }}>
          {conversations.map((conv) => (
            <Typography
              key={conv.conversation_id}
              variant="body1"
              className={`${
                customConversationId === conv.conversation_id
                  ? "whitespace-nowrap overflow-hidden text-ellipsis max-w-60 bg-gray-200 hover:bg-gray-200 active:bg-gray-300 p-1 hover:rounded-lg rounded-lg"
                  : "whitespace-nowrap overflow-hidden text-ellipsis max-w-60 hover:bg-gray-200 active:bg-gray-300 px-2 py-1 hover:rounded-lg rounded-lg"
              }`}
              onClick={() => {
                setCustomChat(conv.messages || []);
                setCustomConversationId(conv.conversation_id);
              }}
              sx={{ cursor: "pointer" }}
            >
              {conv.title}
            </Typography>
          ))}
        </Box>
      </Box>
      <div className="w-[100%] flex justify-center">
        <div className="w-[1500px]">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: showSidebar ? "300px" : "0",
              transition: "width 1.5s linear",
              transform: showSidebar ? "translateX(-100)" : "translateX(0%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                position: "sticky",
                top: 0,
                pt: 5,
                zIndex: 999,
              }}
            >
              <div className="w-full h-12 flex justify-center items-center ">
                <div className="w-3/4 h-12 flex bg-gray-50 justify-between px-4 border rounded-full items-center border-gray-400">
                  <input
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    className="w-11/12 h-10 outline-none pr-2 bg-gray-50"
                    placeholder="Ask your questions ..."
                  />
                  <TravelExploreOutlined
                    onClick={handleSubmit}
                    sx={{
                      color: searchInput.length ? "#696969" : "#e9e9e9",
                      cursor: searchInput.length ? "pointer" : "text",
                    }}
                  />
                </div>
              </div>
            </Box>
            {showLoading ? <LoadingPage /> : <Chats customChat={customChat} />}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
