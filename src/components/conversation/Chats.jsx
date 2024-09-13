import { Box, Typography } from "@mui/material";
import React from "react";

export const Chats = ({ customChat }) => {
  console.log(customChat);
  return (
    <div className="h-[700px] overflow-y-scroll">
      {customChat.map((e, index) => {
        return (
          <Box key={e.id} sx={{ mx: 25, mt: 3 }}>
            <div className="py-3">
              {index == 0 && (
                <Typography sx={{ p: 2, pt: 0, pb: 1 }}>You</Typography>
              )}
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
                <Typography>{e.question}</Typography>
              </Box>
            </div>
            <div className="flex flex-col justify-end items-end py-3">
              {index == 0 && (
                <Typography sx={{ p: 2, pt: 0, pb: 1 }}>AI</Typography>
              )}
              <Box
                sx={{
                  border: 1,
                  borderColor: "gray",
                  borderRadius: 5,
                  borderBottomRightRadius: 80,
                  p: 3,
                  bgcolor: "#B8C2A2",
                  minWidth: 400,
                  maxWidth: 500,
                  width: "fit-content",
                }}
              >
                <Typography>{e.answer}</Typography>
              </Box>
            </div>
          </Box>
        );
      })}
    </div>
  );
};
