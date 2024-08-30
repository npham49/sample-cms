import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BrowserRouter from "./Router.tsx";
import store from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
