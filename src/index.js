import React from "react";
import ReactDOM from "react-dom/client"; 
import "./styles/index.css"; 
import "./styles/font.css"; 
import "./styles/color.css"; 
import { ThemeProvider } from "@material-tailwind/react";  
import ProjectRoutes from "./Routes";
const root = ReactDOM.createRoot(document.getElementById("root"));
 
root.render(
  <React.StrictMode>
    <ThemeProvider> 
      <ProjectRoutes/>
    </ThemeProvider>
  </React.StrictMode>
);