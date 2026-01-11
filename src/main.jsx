import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { router } from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
           <Toaster
              position="top-center" 
              containerStyle={{
                  top: 40, 
              }}
              toastOptions={{
                className: "font-black text-sm uppercase tracking-widest",
                style: {
                  borderRadius: "1rem",
                  background: "#1e3a8a",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "16px",
                  zIndex: 9999, 
                },
                success: {
                  duration: 5000,
                  iconTheme: { primary: "#0ea5e9", secondary: "#fff" },
                  style: { background: "#0f172a" },
                },
                error: {
                  duration: 5000,
                  iconTheme: { primary: "#ff4b4b", secondary: "#fff" },
                  style: { background: "#7f1d1d" },
                },
              }}
            />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
