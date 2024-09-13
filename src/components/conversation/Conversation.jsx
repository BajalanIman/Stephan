import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ViewSidebarRounded from "@mui/icons-material/ViewSidebarRounded";
import TravelExploreOutlined from "@mui/icons-material/TravelExploreOutlined";

import { Chats } from "./Chats";
import SampleConversationTitle from "./SampleConversationTitle";

const Conversation = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [customChat, setCustomChat] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="w-full h-screen flex relative bg-gradient-to-r from-[#D9D9D9] to-[#E7F9EA]">
      <Box
        sx={{
          width: showSidebar ? "20%" : "0",
          height: "100%",
          display: "flex",
          position: "fixed",
          transition: "transform 0.5s ease",
          transform: showSidebar ? "translateX(0)" : "translateX(-100%)",
          transformOrigin: "right left",
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
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: "bold", ml: 2 }}>
                Conversations
              </Typography>
            </>
          )}
        </Box>
        <Box sx={{ overflowY: "scroll", mb: 5 }}>
          {SampleConversationTitle.map((el) => (
            <Typography
              key={el.id}
              variant="body1"
              className="whitespace-nowrap overflow-hidden text-ellipsis max-w-60 hover:bg-gray-300 active:bg-gray-400 p-1 rounded-2xl"
              onClick={() => {
                setCustomChat(el.chat);
                console.log(customChat);
              }}
              sx={{ cursor: "pointer" }}
            >
              {el.title}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: showSidebar ? "20%" : "0",
          width: showSidebar ? "80%" : "100%",
          transition: "width 0.5s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "sticky",
            top: 0,
            pt: 5,
            background: "linear-gradient(to right, #D9D9D9, #E7F9EA)",
            zIndex: 999,
            bgcolor: "red",
          }}
        >
          {!showSidebar && (
            <IconButton onClick={() => setShowSidebar(!showSidebar)}>
              <ViewSidebarRounded sx={{ color: "#696969" }} />
            </IconButton>
          )}
          <div className="w-full h-12 flex justify-center items-center">
            <div className="w-2/4 h-12 flex bg-gray-50 justify-center border rounded-full items-center border-gray-400">
              <input
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                value={searchInput}
                className="w-4/5 h-10 outline-none pr-2 bg-gray-50"
                placeholder="Ask any question ..."
              />
              <TravelExploreOutlined
                sx={{
                  color: searchInput.length ? "#696969" : "#e9e9e9",
                  cursor: searchInput.length ? "pointer" : "text",
                }}
              />
            </div>
          </div>
        </Box>
        <Chats customChat={customChat} />
      </Box>
    </div>
  );
};

export default Conversation;
