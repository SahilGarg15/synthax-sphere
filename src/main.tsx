import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeMockData } from "./data/mockData";

// Initialize mock data in localStorage on app startup
initializeMockData();

createRoot(document.getElementById("root")!).render(<App />);
