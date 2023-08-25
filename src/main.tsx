import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./components/chat/widget";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";

const root = document.createElement("div");
root.id = "chat-script";
root.className = "chat-script";

document.body.appendChild(root);

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(root!).render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <ChatWidget />
    </QueryClientProvider>
  </React.Fragment>
);
