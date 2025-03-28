import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
