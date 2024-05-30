// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

// Get the root element from the DOM
const container = document.getElementById("root");
const root = createRoot(container!); // Use non-null assertion operator

// Render the application with the Redux provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
