import React from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import adaptLogo from "./../../assets/Images/adaptLogo.png";

const Chats = ({ customChat }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard successfully!");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div className="w-full h-[100%] min-h-screen pb-10">
      {customChat.map((message) => (
        <Box
          key={message.message_id}
          sx={{
            marginTop: 2,
            marginX: 25,
            padding: 2,
            // backgroundColor: "#f0f0f0",
            borderRadius: "10px",
          }}
        >
          <div key={message.message_id}>
            <Typography sx={{ fontWeight: "bold" }}>You</Typography>
            <Box
              sx={{
                border: 1,
                borderColor: "gray",
                borderRadius: 5,
                borderBottomLeftRadius: 80,
                p: 3,
                bgcolor: "#A2C2B8",
                minWidth: 400,
                maxWidth: 500,
                width: "fit-content",
              }}
            >
              {message.question}
            </Box>

            <div className="flex flex-col justify-end items-end py-3">
              <img src={adaptLogo} className="w-9" />

              <Box
                sx={{
                  border: 1,
                  borderColor: "gray",
                  borderRadius: 5,
                  borderBottomRightRadius: 80,
                  padding: "10px 15px 15px 15px",
                  bgcolor: "#B8C2A2",
                  minWidth: 400,
                  maxWidth: 500,
                  width: "fit-content",
                  height: "fit-content",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    mt: 2,
                  }}
                >
                  <Tooltip title="copy to clipboard" arrow>
                    <ContentCopyIcon
                      onClick={() => copyToClipboard(message.answer)}
                      sx={{
                        fill: "#565656",
                        cursor: "pointer",
                        ":hover": { fill: "blue" },
                        ":active": { fill: "darkblue" },
                      }}
                      variant="contained"
                    />
                  </Tooltip>
                </Box>
                <Typography>{message.answer}</Typography>
              </Box>
            </div>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default Chats;
