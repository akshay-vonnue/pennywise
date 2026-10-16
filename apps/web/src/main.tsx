import { createRoot } from "react-dom/client";
import "./style.css";
import { RouterProvider } from "react-router";
import router from "./routes/Router";

const App = () => (
  <div>
    <RouterProvider router={router}/>
  </div>
);

createRoot(document.getElementById("app")!).render(<App />);
