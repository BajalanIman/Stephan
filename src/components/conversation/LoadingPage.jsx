import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full absolute flex justify-center top-0 left-0 bg-gradient-to-r from-[#D9D9D9] to-[#E7F9EA]">
      <Stack spacing={2} direction="row" alignItems="center">
        <CircularProgress size={70} />
      </Stack>
    </div>
  );
};

export default LoadingPage;
