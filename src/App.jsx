import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import FirstPage from "./components/login/FirstPage.jsx";
import React from "react";
import Loggin from "./components/login/Loggin.jsx";
import SingUp from "./components/login/SingUp.jsx";
import Conversation from "./components/conversation/Conversation.jsx";
import BlankPage from "./BlankPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<FirstPage />} />
        <Route path="/loggin" index element={<Loggin />} />
        <Route path="/singup" index element={<SingUp />} />
        <Route path="/conversation" index element={<Conversation />} />
        <Route path="/blankpage" index element={<BlankPage />} />
      </Routes>
    </Router>
  );
}

export default function WrappedApp() {
  return import.meta.env.MODE === "development" ? (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  ) : (
    <App />
  );
}
