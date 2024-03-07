import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; 
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";  
import "../public/css/tailwind.css"; 
import "../public/css/custom.css";
import 'primeicons/primeicons.css'; 
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/tailwind-light/theme.css'; 

ReactDOM.createRoot(document.getElementById("root")).render( 
    <BrowserRouter>
      <ThemeProvider>  
        <MaterialTailwindControllerProvider> 
            <App />
        </MaterialTailwindControllerProvider> 
      </ThemeProvider>
    </BrowserRouter> 
);
