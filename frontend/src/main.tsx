import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ReactQueryProvider } from "./lib/react-query-provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </StrictMode>
);
